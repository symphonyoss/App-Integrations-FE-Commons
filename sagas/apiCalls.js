import axios from 'axios';
import { Utils } from '../js/utils.service';
import config from '../js/config.service';

const configurationId = Utils.getParameterByName('configurationId');
const botUserId = Utils.getParameterByName('botUserId');
const appName = Utils.getParameterByName('id');
const hostPort = window.location.port === 443 ? '' : `:${window.location.port}`;
const baseUrl = `${window.location.protocol}//${window.location.hostname}${hostPort}/integration`;
const baseWebHookURL = `${baseUrl}/v1/whi/${appName}/${configurationId}`;
const baseAuthenticationUrl = `${baseUrl}/v1/application/${configurationId}/jwt`;

export const getAppName = () => appName;

export const getInstance = () => ({
  instanceId: null,
  name: '',
  configurationId,
  creatorId: null,
  streamType: 'IM',
  lastPosted: null,
  baseWebHookURL,
  postingLocationRooms: [],
  streams: [],
  loading: false,
});

export const setInstance = _instance => ({
  instanceId: _instance.instanceId,
  name: _instance.name,
  configurationId,
  streamType: _instance.streamType,
  lastPosted: _instance.lastPosted,
  baseWebHookURL: _instance.baseWebHookURL,
  postingLocationRooms: _instance.postingLocationRooms.slice(),
});

export const getUserId = () => {
  const extendedUserService = SYMPHONY.services.subscribe('extended-user-service');
  return extendedUserService.getUserId().then(data => data);
};

export const getRooms = () => {
  const extendedUserService = SYMPHONY.services.subscribe('extended-user-service');
  return extendedUserService.getRooms().then(data => Utils.getUserRooms(data));
};

export const getParams = () => config.getParams();

export const getInstructions = () => config.getInstructions();

export const getList = () => {
  const integrationConfService = SYMPHONY.services.subscribe('integration-config');
  return integrationConfService.getConfigurationInstanceList(configurationId)
  .then(data => Utils.normalizeInstanceList(data));
};

export const addMembership = (stream) => {
  const streamService = SYMPHONY.services.subscribe('stream-service');
  return streamService.addRoomMembership(stream, botUserId);
};

export const createIM = () => {
  const streamService = SYMPHONY.services.subscribe('stream-service');
  return streamService.createIM([botUserId]);
};

export const saveInstance = (state) => {
  // build Optional Properties
  let opStreams = '';
  state.instance.streams.map((stream, idx) => {
    if (idx === 0) {
      opStreams += `"${stream}"`;
    } else {
      opStreams += `, "${stream}"`;
    }
  });
  const optionalProperties = `{"owner": "${state.userId}", "streams": [${opStreams}], "streamType": "${state.instance.streamType}"}`;
  // build payload
  const payload = {
    configurationId,
    name: state.instance.name,
    creatorId: state.userId,
    optionalProperties,
  };
  // save the instance
  const integrationConfigService = SYMPHONY.services.subscribe('integration-config');
  return integrationConfigService.createConfigurationInstance(configurationId, payload);
};

export const editInstance = (state) => {
  // build Optional Properties
  let opStreams = '';
  state.instance.streams.map((stream, idx) => {
    if (idx === 0) {
      opStreams += `"${stream}"`;
    } else {
      opStreams += `, "${stream}"`;
    }
  });
  const optionalProperties = `{"owner": "${state.userId}", "streams": [${opStreams}], "streamType": "${state.instance.streamType}"}`;
  // build payload
  const payload = {
    instanceId: state.instance.instanceId,
    configurationId,
    name: state.instance.name,
    optionalProperties,
  };
  const integrationConfigService = SYMPHONY.services.subscribe('integration-config');
  return integrationConfigService.updateConfigurationInstanceById(
    configurationId, state.instance.instanceId, payload);
};

export const removeInstance = (state) => {
  const integrationConfService = SYMPHONY.services.subscribe('integration-config');
  return integrationConfService.deactivateConfigurationInstanceById(
    configurationId, state.instanceId);
};

export const sendWelcomeMessage = (instanceId, streams) => {
  const url = `${baseWebHookURL}/${instanceId}/welcome`;
  const payload = {
    streams,
  };
  axios.post(url, payload)
  .then(data => data)
  .catch(err => err);
};

export const authenticateApp = (podId) => {
  const url = `${baseAuthenticationUrl}/authenticate`;
  return axios.get(url, {
                    params: {
                      podUrl: podId
                    }
                  });
};