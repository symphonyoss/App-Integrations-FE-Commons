import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
// import {
//   INTEGRATION_LOGO,
//   INTEGRATION_SUBTITLE,
// } from '../../actions';
import '../../styles/main.less';
import './styles/styles.less';

const IntegrationHeader = ({ showSubTitle, logo, title, subtitle }) => (
  <div className='wrapper integration-header'>
    <header>
      <figure>
        <img src={`img/${logo}`} alt={title} />
      </figure>
      <h2>{title}</h2>
    </header>
    {
      showSubTitle && (
        <div className='sub-title'>
          {subtitle}
        </div>
      )
    }
  </div>
);

IntegrationHeader.propTypes = {
  showSubTitle: PropTypes.bool,
  logo: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

IntegrationHeader.defaultProps = {
  showSubTitle: false,
};

const mapStateToProps = state => ({
  logo: state.appParams.appLogo,
  title: state.appParams.appName,
  subtitle: state.appParams.appSubTitle,
});

export default connect(
  mapStateToProps,
)(IntegrationHeader);
