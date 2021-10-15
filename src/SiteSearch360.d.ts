declare module 'SiteSearch360' {
	import React from 'react';

	interface SiteSearch360Props {
		ss360Config: object;
		siteId: string;
		alias: string;
		showButton: boolean;
		applyStyling: boolean
	}

	export const SiteSearch360: (props: SiteSearch360Props) => React.SFC<SiteSearch360Props>
}