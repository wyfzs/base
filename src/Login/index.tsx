import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 添加导航导入

type LoginType = 'phone' | 'account';

const Login = () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const navigate = useNavigate(); // 使用导航钩子

  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  // 登录提交处理函数
  const handleLogin = async (values: any) => {
    try {
      console.log('登录数据:', values);

      // 模拟登录API调用
      // const response = await loginAPI(values);

      // 这里可以加入实际的登录逻辑
      if (loginType === 'account') {
        // 账号密码登录逻辑
        if (values.username === 'admin' && values.password === '123456') {
          message.success('登录成功！');
          localStorage.setItem('token', 'mock-token'); // 模拟存储token
          navigate('/admin/welcome'); // 跳转到首页
        } else {
          message.error('用户名或密码错误！');
        }
      } else if (loginType === 'phone') {
        // 手机号登录逻辑
        if (values.captcha === '1234') { // 验证码固定为1234
          message.success('登录成功！');
          localStorage.setItem('token', 'mock-token');
          navigate('/admin/welcome');
        } else {
          message.error('验证码错误！');
        }
      }
    } catch (error) {
      message.error('登录失败，请重试');
      console.error('登录错误:', error);
    }
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm
            logo="涂涂.png"
            title="有点6的系统"
            subTitle="涂涂的系统"
            onFinish={handleLogin} // 添加表单提交处理
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
              <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
            </Tabs>
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'用户名: admin'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                    {
                      min: 2,
                      max: 20,
                      message: '用户名长度应在2-20个字符之间',
                    }
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                    strengthText:
                      '密码应包含数字、字母和特殊字符，至少8位。',
                    statusRender: (value) => {
                      const getStatus = () => {
                        if (value && value.length > 12) {
                          return 'ok';
                        }
                        if (value && value.length > 6) {
                          return 'pass';
                        }
                        return 'poor';
                      };
                      const status = getStatus();
                      if (status === 'pass') {
                        return (
                          <div style={{ color: token.colorWarning }}>
                            强度：中
                          </div>
                        );
                      }
                      if (status === 'ok') {
                        return (
                          <div style={{ color: token.colorSuccess }}>
                            强度：强
                          </div>
                        );
                      }
                      return (
                        <div style={{ color: token.colorError }}>强度：弱</div>
                      );
                    },
                  }}
                  placeholder={'密码: 123456'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                    {
                      min: 6,
                      message: '密码至少6位',
                    }
                  ]}
                />
              </>
            )}
            {loginType === 'phone' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                  }}
                  name="mobile"
                  placeholder={'手机号'}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={'请输入验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'获取验证码'}`;
                    }
                    return '获取验证码';
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                    {
                      pattern: /^\d{4}$/,
                      message: '请输入4位数字验证码',
                    }
                  ]}
                  onGetCaptcha={async () => {
                    message.success('获取验证码成功！验证码为：1234');
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  // 忘记密码逻辑
                  message.info('忘记密码功能待实现');
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};

export default Login;