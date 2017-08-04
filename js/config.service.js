const config = (function () {
  const pub = {};
  let params = {};
  let instructions;
  let messageTemplate;

  pub.setParams = (values) => {
    params = Object.assign({}, values);
  };

  pub.getParams = () => params;

  pub.setInstructions = (template) => {
    instructions = template;
  };

  pub.getInstructions = () => instructions;

  pub.setMessageTemplate = (template) => {
    messageTemplate = template;
  };

  pub.getMessageTemplate = () => messageTemplate;


  return pub;
}());

export default config;
