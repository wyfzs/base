import {
    CrownFilled,
    DoubleRightOutlined,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    SearchOutlined,
    SkinOutlined,
    SmileFilled,
    TabletFilled,
    SunOutlined,
    MoonOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
    SettingDrawer,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import {
    Button,
    ConfigProvider,
    Divider,
    Dropdown,
    Input,
    Popover,
    Space,
    theme,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../Store/reduce/themeSlice';


const Item: React.FC<{ children: React.ReactNode }> = (props) => {
    const { token } = theme.useToken();
    return (
        <div
            className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
            style={{
                width: '33.33%',
            }}
        >
            {props.children}
            <DoubleRightOutlined
                style={{
                    marginInlineStart: 4,
                }}
            />
        </div>
    );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (
    props,
) => {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                width: '100%',
                ...props.style,
            }}
        >
            <div
                style={{
                    fontSize: 16,
                    color: token.colorTextHeading,
                    lineHeight: '24px',
                    fontWeight: 500,
                    marginBlockEnd: 16,
                }}
            >
                {props.title}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                {new Array(6).fill(1).map((_, index) => {
                    return <Item key={index}>具体的解决方案-{index}</Item>;
                })}
            </div>
        </div>
    );
};
const SearchInput = () => {
    const { token } = theme.useToken();
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover,
                }}
                prefix={
                    <SearchOutlined
                        style={{
                            color: token.colorTextLightSolid,
                        }}
                    />
                }
                placeholder="搜索方案"
                variant="borderless"
            />
            <PlusCircleFilled
                style={{
                    color: token.colorPrimary,
                    fontSize: 24,
                }}
            />
        </div>
    );
};

export default () => {
    const Theme = useSelector((state: any) => state.theme);
    const dispatch = useDispatch();
    console.log(Theme, '[[[[[[');
    const { token } = theme.useToken();
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        "fixSiderbar": true,
        "layout": "mix",
        "splitMenus": false,
        "navTheme": "light",
        "contentWidth": "Fluid",
        "colorPrimary": "#1677FF",
        "collapsed": false,
        "siderMenuType": "sub",
        "fixedHeader": true
    });

    const navigate = useNavigate();
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname || '/welcome');
    const [num, setNum] = useState(40);
    if (typeof document === 'undefined') {
        return <div />;
    }
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    theme={{
                        algorithm: Theme.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    }}
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        prefixCls="my-prefix"
                        route={{
                            routes: [
                                {
                                    path: '/admin/welcome',
                                    name: '欢迎',
                                    icon: <SmileFilled />,
                                },
                                {
                                    path: '/admin/manage',
                                    name: '管理页',
                                    icon: <CrownFilled />,
                                    routes: [
                                        {
                                            path: 'two',
                                            name: '二级页面',
                                            icon: <CrownFilled />,
                                        },
                                    ],
                                },
                                {
                                    name: '列表页',
                                    icon: <TabletFilled />,
                                    path: '/admin/list',
                                    routes: [
                                        {
                                            path: 'two',
                                            name: '二级页面',
                                            icon: <CrownFilled />,
                                        },
                                    ],
                                },
                            ],
                        }}
                        location={{
                            pathname,
                        }}
                        token={{
                            header: {
                                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                            },
                        }}
                        siderMenuType="group"
                        menu={{
                            collapsedShowGroupTitle: true,
                        }}
                        //头像 退出登录
                        avatarProps={{
                            src: 'public\涂涂.png',
                            size: 'small',
                            title: '涂涂',
                            render: (props, dom) => {
                                return (
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'logout',
                                                    icon: <LogoutOutlined />,
                                                    label: '退出登录',
                                                },
                                            ],
                                            onClick: (e) => {
                                                if (e.key === 'logout') {
                                                    navigate('/login');
                                                }
                                            },
                                        }}
                                    >
                                        {dom}
                                    </Dropdown>
                                );
                            },
                        }}
                        //顶部操作
                        actionsRender={(props) => {
                            if (props.isMobile) return [];
                            if (typeof window === 'undefined') return [];
                            return [
                                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                                    <SearchInput />
                                ) : undefined,
                                Theme.theme === 'dark' ? (
                                    <SunOutlined
                                        onClick={() => {
                                            dispatch(toggleTheme());
                                        }}
                                        style={{ fontSize: '16px', cursor: 'pointer' }}
                                    />
                                ) : (
                                    <MoonOutlined
                                        onClick={() => {
                                            dispatch(toggleTheme());
                                        }}
                                        style={{ fontSize: '16px', cursor: 'pointer' }}
                                    />
                                ),
                            ];
                        }}
                        //系统名称自定义
                        headerTitleRender={(logo, title, _) => {
                            const defaultDom = (
                                <a style={{
                                    color: Theme.theme === 'light' ? 'black' : '#cccccc'
                                }}>
                                    你看我叼你吗
                                </a>
                            );
                            if (typeof window === 'undefined') return defaultDom;
                            if (document.body.clientWidth < 1400) {
                                return defaultDom;
                            }
                            if (_.isMobile) return defaultDom;
                            return (
                                <>
                                    {defaultDom}
                                </>
                            );
                        }}
                        onMenuHeaderClick={(e) => console.log(e)}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    if (item.path) {
                                        navigate(item.path);
                                        setPathname(item.path);
                                    }
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        {...settings}
                    >
                        <Outlet />
                    </ProLayout >
                </ConfigProvider >
            </ProConfigProvider >
        </div >
    );
};