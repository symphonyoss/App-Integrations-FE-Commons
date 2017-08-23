/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Utils } from './js/utils.service';
import configureStore from './store/configureStore';
import factory from './js/config.service';
import './vendors/font-awesome-4.6.3/css/font-awesome.min.css';
import {
  getUserId as getUserIdService,
  getRooms as getRoomsService,
  getList as getListService,
  addMembership as addMembershipService,
  createIM as createIMService,
  saveInstance as saveInstanceService,
  editInstance as editInstanceService,
  removeInstance as removeInstanceService,
  sendWelcomeMessage as sendWelcomeMessageService,
  authenticateApp as authenticateAppService,
} from './sagas/apiCalls';
import { connect as connectService } from './services/connectService';
import { register as registerService } from './services/registerService';

// Components
import ConfigureNewComponent from './components/ConfigureNew/ConfigureNew';
import InputDescriptionComponent from './components/InputDescription/InputDescription';
import InputDescriptionInfoComponent from './components/InputDescriptionInfo/InputDescriptionInfo';
import IntegrationHeaderComponent from './components/IntegrationHeader/IntegrationHeader';
import MessageBoxComponent from './components/MessageBox/MessageBox';
import PostingLocationComponent from './components/PostingLocation/PostingLocationContainer';
import PostingLocationInfoComponent from './components/PostingLocationInfo/PostingLocationInfo';
import SpinnerComponent from './components/Spinner/Spinner';
import SubmitInstanceComponent from './components/SubmitInstance/SubmitInstanceContainer';
import TableInstanceComponent from './components/TableInstance/TableInstanceContainer';
import WebHookURLComponent from './components/WebHookURLCopy/WebHookURLCopy';
import MessageEnricher from './js/messageEnricher';
// Views
import HomeScreen from './views/Home';
import CreateScreen from './views/CreateView';
import EditScreen from './views/EditView';
import InstanceCreatedScreen from './views/InstanceCreated';
import RemoveViewScreen from './views/RemoveView';
// Export Components
export const ConfigureNew = ConfigureNewComponent;
export const InputDescription = InputDescriptionComponent;
export const InputDescriptionInfo = InputDescriptionInfoComponent;
export const IntegrationHeader = IntegrationHeaderComponent;
export const MessageBox = MessageBoxComponent;
export const PostingLocation = PostingLocationComponent;
export const PostingLocationInfo = PostingLocationInfoComponent;
export const Spinner = SpinnerComponent;
export const SubmitInstance = SubmitInstanceComponent;
export const WebHookURL = WebHookURLComponent;
export const MessageEnricherBase = MessageEnricher;

export const TableInstance = TableInstanceComponent;
export const WebHookURLCopy = WebHookURLComponent;

// Export Services
export const getUserId = getUserIdService;
export const getRooms = getRoomsService;
export const getList = getListService;
export const addMembership = addMembershipService;
export const createIM = createIMService;
export const saveInstance = saveInstanceService;
export const editInstance = editInstanceService;
export const removeInstance = removeInstanceService;
export const sendWelcomeMessage = sendWelcomeMessageService;
export const authenticateApp = authenticateAppService;
export const connect = connectService;
export const register = registerService;

// Export Views
export const Home = HomeScreen;
export const CreateView = CreateScreen;
export const EditView = EditScreen;
export const InstanceCreated = InstanceCreatedScreen;
export const RemoveView = RemoveViewScreen;