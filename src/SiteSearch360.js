import React from 'react';
import PropTypes from 'prop-types';

const SEARCH_BOX_CLASS_NAME = 'ss360-searchbox';
const SEARCH_BUTTON_CLASS_NAME = 'ss360-searchbutton';

class SiteSearch360 extends React.Component {
	ensureConfig() {
		// ensure config exists and set selectors
		let ss360Config = window.ss360Config;

		//
		const searchBoxClassName = this.props.alias === undefined || this.props.alias.length === 0 ? SEARCH_BOX_CLASS_NAME : `${SEARCH_BOX_CLASS_NAME}--${this.props.alias}`;
		const searchButtonClassName = this.props.alias === undefined || this.props.alias.length === 0 ? SEARCH_BUTTON_CLASS_NAME : `${SEARCH_BUTTON_CLASS_NAME}--${this.props.alias}`;

		if (ss360Config === undefined || (this.props.alias !== undefined && this.props.ss360Config !== undefined)) {
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

		if (selector.indexOf(`.${searchBoxClassName}`) === -1) {
			if (selector.length > 0) {
				selector = `${selector},`;
			}
			searchBox.selector = `${selector}.${searchBoxClassName}`;
		}

		if (searchButton.indexOf(`.${searchButtonClassName}`) === -1) {
			if (searchButton.length > 0) {
				searchButton = `${searchButton},`;
			}
			searchBox.searchButton = `${searchButton}.${searchButtonClassName}`;
		}

		if (this.props.siteId !== undefined) {
			ss360Config.siteId = this.props.siteId;
		}

		if (this.props.alias === undefined) {
			window.ss360Config = ss360Config;
		} else {
			if (!('ss360Configs' in window)) {
				window.ss360Configs = {};
			}
			window.ss360Configs[this.props.alias] = ss360Config;
		}
	}

	componentDidMount() {
		this.ensureConfig();

		if (document.getElementById('ss360-script') === null) { // append Site Search 360 script
			const script = document.createElement('script');
			script.setAttribute('defer', 'defer');
			script.setAttribute('id', 'ss360-script');
			script.src = 'https://cdn.sitesearch360.com/v14/sitesearch360-v14.min.js';
			document.getElementsByTagName('body')[0].appendChild(script);
		} else if ('initializeSs360' in window) { // reinitialize script
			window.initializeSs360();
		}
	}

	render() {
		const searchBoxClassName = this.props.alias === undefined || this.props.alias.length === 0 ? SEARCH_BOX_CLASS_NAME : `${SEARCH_BOX_CLASS_NAME}--${this.props.alias}`;
		const searchButtonClassName = this.props.alias === undefined || this.props.alias.length === 0 ? SEARCH_BUTTON_CLASS_NAME : `${SEARCH_BUTTON_CLASS_NAME}--${this.props.alias}`;
		const button = this.props.showButton ? <button className={searchButtonClassName}></button> : undefined;
		return (
			<section data-ss360={this.props.applyStyling} className="ss360-search">
				<input type="search" className={searchBoxClassName} />
				{button}
			</section>
		);
	}
}

SiteSearch360.propTypes = {
	ss360Config: PropTypes.object,
	siteId: PropTypes.string,
	alias: PropTypes.string,
	showButton: PropTypes.bool,
	applyStyling: PropTypes.bool
};

SiteSearch360.defaultProps = {
	showButton: true,
	applyStyling: true
};

export default SiteSearch360;