import React from 'react';

interface SiteSearch360Props {
	ss360Config?: object;
	siteId: string;
	alias?: string;
	showButton?: boolean;
	applyStyling?: boolean
}

declare class SiteSearch360 extends React.Component {
	props: SiteSearch360Props;
    ensureConfig(): void;
    componentDidMount(): void;
    render(): any;
}

export default SiteSearch360;