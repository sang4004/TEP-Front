import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MobileDetect from 'mobile-detect';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import PropTypes from 'prop-types';
import React, { createRef, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { EnumDeclaration, EnumMember, EnumType } from 'typescript';
import withRouterAndRef from '../withRouterAndRef/withRouterAndRef';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

enum handlerNameByEventEnum {
	'ps-scroll-y' = 'onScrollY',
	'ps-scroll-x' = 'onScrollX',
	'ps-scroll-up' = 'onScrollUp',
	'ps-scroll-down' = 'onScrollDown',
	'ps-scroll-left' = 'onScrollLeft',
	'ps-scroll-right' = 'onScrollRight',
	'ps-y-reach-start' = 'onYReachStart',
	'ps-y-reach-end' = 'onYReachEnd',
	'ps-x-reach-start' = 'onXReachStart',
	'ps-x-reach-end' = 'onXReachEnd'
}

const useStyles = makeStyles(theme => ({
	root: {}
}));

type handlerNameByEventEnumField = {
	[key in handlerNameByEventEnum] ?: Function
}

interface PropsTypes extends handlerNameByEventEnumField {
	children : React.ReactNode,
	className: string,
	enable: boolean,
	option: {
		wheelPropagation: boolean
	},
	ref?: any,
	// onScrollY: Function | undefined,
	// onScrollX: Function | undefined,
	// onScrollUp: Function | undefined,
	// onScrollDown: Function | undefined,
	// onScrollLeft: Function | undefined,
	// onScrollRight: Function | undefined,
	// onYReachStart: Function | undefined,
	// onYReachEnd: Function | undefined,
	// onXReachStart: Function | undefined,
	// onXReachEnd: Function | undefined,
	scrollToTopOnRouteChange: boolean,
	scrollToTopOnChildChange: boolean,
	customScrollbars : boolean,
	[key : string] : any
}

const FuseScrollbars = React.forwardRef<HTMLDivElement, PropsTypes>((props : PropsTypes, ref : any) => {
	ref = ref ? ref : createRef();
	var ps : any = useRef(PerfectScrollbar.prototype);
	const handlerByEvent = useRef(new Map());
	const classes = useStyles();
	const { customScrollbars } = props;

	const hookUpEvents = useCallback(() => {
		for(var key in handlerNameByEventEnum){
			const callback = props[key];
			if(callback){
				const handler = () => callback(ref.current);
				handlerByEvent.current.set(key, handler);
				ref.current.addEventListener(key, handler, false);
			}
		}
    }, [ref]);

	const unHookUpEvents = useCallback(() => {
		handlerByEvent.current.forEach((value, key) => {
			if (ref.current) {
				ref.current.removeEventListener(key, value, false);
			}
		});
		handlerByEvent.current.clear();
	}, [ref]);

	const destroyPs = useCallback(() => {
		unHookUpEvents();

		if (!ps.current) {
			return;
		} else{
			ps.current.destroy();
			ps = { current : null };
		}
	}, [unHookUpEvents]);

	const createPs = useCallback(() => {
		if (isMobile || !ref || ps.current) {
			return;
		}

		ps.current = new PerfectScrollbar(ref.current, props.option);

		hookUpEvents();
	}, [hookUpEvents, props.option, ref]);

	useEffect(() => {
		function updatePs() {
			if (!ps.current) {
				return;
			}
			ps.current.update();
		}

		updatePs();
	});

	useEffect(() => {
		if (customScrollbars) {
			createPs();
		} else {
			destroyPs();
		}
	}, [createPs, customScrollbars, destroyPs]);

	const scrollToTop = useCallback(() => {
		if (ref && ref.current) {
			ref.current.scrollTop = 0;
		}
	}, [ref]);

	useEffect(() => {
		if (props.scrollToTopOnChildChange) {
			scrollToTop();
		}
	}, [scrollToTop, props.children, props.scrollToTopOnChildChange]);

	// useEffect(
	// 	() =>
	// 		props.history.listen(() => {
	// 			if (props.scrollToTopOnRouteChange) {
	// 				scrollToTop();
	// 			}
	// 		}),
	// 	[scrollToTop, props.history, props.scrollToTopOnRouteChange]
	// );

	useEffect(
		() => () => {
			destroyPs();
		},
		[destroyPs]
	);

	return (
		<div
			id={props.id}
			className={clsx(classes.root, props.className)}
			style={
				props.customScrollbars && (props.enable || true) && !isMobile
					? {
							position: 'relative',
							overflow: 'hidden'
					  }
					: {}
			}
			ref={ref}
		>
			{props.children}
		</div>
	);
});

function mapStateToProps({ fuse } : any) {
	return {
		customScrollbars: fuse.settings.current.customScrollbars
	};
}

// FuseScrollbars.propTypes = {
// 	onScrollY: PropTypes.func,
// 	onScrollX: PropTypes.func,
// 	onScrollUp: PropTypes.func,
// 	onScrollDown: PropTypes.func,
// 	onScrollLeft: PropTypes.func,
// 	onScrollRight: PropTypes.func,
// 	onYReachStart: PropTypes.func,
// 	onYReachEnd: PropTypes.func,
// 	onXReachStart: PropTypes.func,
// 	onXReachEnd: PropTypes.func,
// 	scrollToTopOnRouteChange: PropTypes.bool,
// 	scrollToTopOnChildChange: PropTypes.bool
// };

// FuseScrollbars.defaultProps = {
// 	className: '',
// 	enable: true,
// 	scrollToTopOnChildChange: false,
// 	scrollToTopOnRouteChange: false,
// 	option: {
// 		wheelPropagation: true
// 	},
// 	ref: undefined,
// 	onScrollY: undefined,
// 	onScrollX: undefined,
// 	onScrollUp: undefined,
// 	onScrollDown: undefined,
// 	onScrollLeft: undefined,
// 	onScrollRight: undefined,
// 	onYReachStart: undefined,
// 	onYReachEnd: undefined,
// 	onXReachStart: undefined,
// 	onXReachEnd: undefined
// };

// export default connect(mapStateToProps, null, null, { forwardRef: true })(withRouterAndRef(FuseScrollbars));
export default FuseScrollbars;