/******************************************************************************
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext } from "react"; // default hooks
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { renderRoutes } from 'react-router-config';
//
// Module
import "./index.css";
import { useLocations } from "hooks" // locations hooks
import {
    Getworkcode,
    GetEquipCodes,
    reducerState,
    GetWorkerList
} from "common_module";
import { getConfigByKey } from "utils_js/lib/objfilter";
import { getConstants } from "utils_ts/lib";
import { LoadingIndicatorComponent } from "components";
//
// Fuse Module
import {fuseReducerState} from "../../@fuse_app/store/fuse";
import { setNavigation } from "../../@fuse_app/store/fuse/navigationSlice";
import { 
    Footer, 
    NavbarWrapper, 
    Leftside, 
    Rightside, 
    Toolbar 
} from "../../@fuse_app/fuse-layouts/layout1/components/";
import {
    FuseDialog,
    FuseMessage,
    FuseScrollbars,
    FuseSuspense
} from "../../@fuse/core";
import AppContext from '../../@fuse_app/AppContext';
//

export type appwrapperProps = {
    style ?: object,
    children ?: React.ReactNode,
    theme ?: object
}
interface FinalappwrapperProps extends appwrapperProps {};

export const AppwrapperComponent : React.FunctionComponent<FinalappwrapperProps> = ( props )=>{
    const { back, existBack, path } = useLocations();
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const appContext = useContext(AppContext);
    const config = useSelector((state : fuseReducerState) => state.fuse.settings.current.layout.config);
    const user = useSelector((state : reducerState) => state.user);
    const userSelector = useSelector((state : reducerState) => state.user);
    const workSelector = useSelector((state : reducerState) => state.work);

    const [navConfig, setNavConfig] = useState<object|null>(null);
    const { routes } = appContext;
    
    
    useEffect(()=>{
        // initialize here
        // dispatch(Handshake());
        let nav = getConstants("NAVIGATION_FOR_POP");
        if(nav != navConfig){
            dispatch(setNavigation(nav != null ? nav : []));
            setNavConfig(nav);
        }
    }, []);

    useEffect(()=>{
        if(path == "/")
            location.href = "/workstat";

        if(userSelector.id == null && path && path?.indexOf("login") == -1)
            location.href = "/login";
            
    }, [path]);

    useEffect(()=>{
        if(userSelector.id == null && path && path.indexOf("login") == -1){
            window.location.href = "/login";
        }

        if(userSelector.id){
            dispatch(Getworkcode(user.token, user.id));
        }
    }, [userSelector.id]);

    useEffect(()=>{
        if(workSelector.selectedLine){
            dispatch(GetEquipCodes(userSelector.token, workSelector.selectedLine.lineNo));
            dispatch(GetWorkerList(userSelector.token, workSelector.selectedLine.lineNo));
        }
    }, [ workSelector.selectedLine ]);

    const navType = [""];
    const isUserNavBar= [false];
    const isFooter= [false];
    const navTopInfo = [{
        "logo_url" : "http://www.sunildyfas.com/images/common/logo.jpg",
        "logo_only" : true
    }];

    return (
        <div 
            id="fuse-layout" 
            className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}
            style={props.style}
            >
            { config.leftSidePanel.display && <Leftside /> }
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {config.toolbar.display && config.toolbar.position === 'above' && <Toolbar className="top-toolbar" />}
                <div className={classes.wrapper}>
                    {config.navbar.display && config.navbar.position === 'left' && 
                        <NavbarWrapper 
                            navBarClassName="nav-appbar"
                            navType={navType} 
                            userNavBar={isUserNavBar}
                            navTopInfo={navTopInfo}
                            />
                    }
                    <div className={classes.contentWrapper}>
                        {config.toolbar.display &&
                            config.toolbar.position === 'below' &&
                            config.toolbar.style === 'fixed' && <Toolbar className="top-toolbar" />}

                        <FuseScrollbars className={classes.content} scrollToTopOnRouteChange>
                            {config.toolbar.display &&
                                config.toolbar.position === 'below' &&
                                config.toolbar.style !== 'fixed' && <Toolbar className="top-toolbar" />}

                            <FuseDialog />
                            <LoadingIndicatorComponent open={workSelector.isLoading}/>
                            <FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

                            <div style={{width : "100%", height : "100%", padding : path?.indexOf("login") != -1 ? "none" : "10px"}}>{props.children}</div>

                            {config.footer.display &&
                                config.footer.position === 'below' &&
                                config.footer.style !== 'fixed' && <Footer isVisible={isFooter} />}
                        </FuseScrollbars>

                        {config.footer.display &&
                            config.footer.position === 'below' &&
                            config.footer.style === 'fixed' && <Footer isVisible={isFooter} />}

                        {/* <SettingsPanel />/ */}
                    </div>
                    {config.navbar.display && config.navbar.position === 'right' && 
                        <NavbarWrapper 
                            navBarClassName="nav-appbar"
                            navType={navType} 
                            userNavBar={isUserNavBar}
                            navTopInfo={navTopInfo}
                            />
                    }
                </div>
                {config.footer.display && config.footer.position === 'above' && <Footer isVisible={isFooter} />}
            </div>
            {config.rightSidePanel.display && <Rightside />}
            <FuseMessage />
        </div>
    );
}

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
		},
		'&.scroll-body': {
			'& $wrapper': {
				height: 'auto',
				flex: '0 0 auto',
				overflow: 'auto'
			},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'&.scroll-content': {
			'& $wrapper': {},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'& .navigation': {
			'& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	wrapper: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100%',
		flex: '1 1 auto'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		zIndex: 3,
		overflow: 'hidden',
		flex: '1 1 auto',
        backgroundColor : "#EDEDED"
	},
	content: {
		position: 'relative',
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 2,
	}
}));