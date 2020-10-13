import React from 'react';
import PropTypes from 'prop-types';

const SEARCH_BOX_CLASS_NAME = 'ss360-searchbox';
const SEARCH_BUTTON_CLASS_NAME = 'ss360-searchbutton';

class SiteSearch360 extends React.Component {
	ensureConfig() {
		// ensure config exists and set selectors
		let ss360Config = window.ss360Config;

		if (ss360Config === undefined) {
			ss360Config = this.props.ss360Config;
		}

		if (ss360Config === undefined || !(ss360Config instanceof Object)) {
			ss360Config = {};
		}

		if (ss360Config.searchBox === undefined) {
			ss360Config.searchBox = {};
		}

		const { searchBox } = ss360Config;

		if (searchBox.selector === undefined) {
			searchBox.selector = '';
		}

		if (searchBox.searchButton === undefined) {
			searchBox.searchButton = '';
		}

		let { selector, searchButton } = searchBox;

		if (selector.indexOf(`.${SEARCH_BOX_CLASS_NAME}`) === -1) {
			if (selector.length > 0) {
				selector = `${selector},`;
			}
			searchBox.selector = `${selector}.${SEARCH_BOX_CLASS_NAME}`;
		}

		if (searchButton.indexOf(`.${SEARCH_BUTTON_CLASS_NAME}`) === -1) {
			if (searchButton.length > 0) {
				searchButton = `${searchButton},`;
			}
			searchBox.searchButton = `${searchButton}.${SEARCH_BUTTON_CLASS_NAME}`;
		}

		if (this.props.siteId !== undefined) {
			ss360Config.siteId = this.props.siteId;
		}

		window.ss360Config = ss360Config;
	}

	componentDidMount() {
		this.ensureConfig();

		if (document.getElementById('ss360-script') === null) { // append Site Search 360 script
			const script = document.createElement('script');
			script.setAttribute('defer', 'defer');
			script.setAttribute('id', 'ss360-script');
			script.src = 'https://cdn.sitesearch360.com/v13/sitesearch360-v13.min.js';
			document.getElementsByTagName('body')[0].appendChild(script);
		} else if ('initializeSs360' in window) { // reinitialize script
			window.initializeSs360();
		}
	}

	render() {
		const button = this.props.showButton ? <button className={SEARCH_BUTTON_CLASS_NAME}></button> : undefined;
		return (
			<section data-ss360="true" className="ss360-search">
				<input type="search" className={SEARCH_BOX_CLASS_NAME} />
				{button}
			</section>
		);
	}
}

SiteSearch360.propTypes = {
	ss360Config: PropTypes.object,
	siteId: PropTypes.string,
	showButton: PropTypes.bool
};

SiteSearch360.defaultProps = {
	showButton: true
};

export default SiteSearch360;