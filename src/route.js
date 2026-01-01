import { createBrowserRouter } from 'react-router-dom';
import Login from './Login/index.tsx';
import Layout from "./Layout/index.tsx";
const route = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    {
        path: '/admin',
        element: <Layout />,
        children: [
            {
                path: 'welcome',
                element: <div>welcome大发发</div>,
            },

            {
                path: 'manage/two',
                element: <div>管理页面二级</div>,
            },

            {
                path: 'list/two',
                element: <div>列表二级页面</div>,
            },
        ],
    }

])

export default route;