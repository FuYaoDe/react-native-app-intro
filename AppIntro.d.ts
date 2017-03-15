declare module "react-native-app-intro" {
	import * as React from 'react';

	export interface AppIntroProperties extends React.Props<AppIntro>{
		dotColor?: string,
		activeDotColor?: string,
		rightTextColor?: string,
		leftTextColor?: string,
		onSlideChange?: Function,
		onSkipBtnClick?: Function,
		onDoneBtnClick?: Function,
		onNextBtnClick?: Function,
		pageArray?: Array<any>,
		doneBtnLabel?: string | React.ReactElement<any>,
		skipBtnLabel?: string | React.ReactElement<any>,
		nextBtnLabel?: string | React.ReactElement<any>,
		customStyles?: object,
		defaultIndex?: number,
		showSkipButton?: boolean,
		showDoneButton?: boolean,
		showDots?: boolean,
	}
	
	export interface AppIntroStatic extends React.NativeMethodsMixin, React.ComponentClass<AppIntroProperties>{}
	
	var AppIntro: AppIntroStatic;
	type AppIntro = AppIntroStatic;

	export default AppIntro;
}