/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the MIT License.
 */
import React from 'react';
import {Form, Input, Icon, Button, Tabs, Modal} from 'antd';
import styles from './login.module.css';
import history from 'libs/history';
import {http, updatePermissions} from 'libs';
import logo from 'layout/logo-spug.png';
import envStore from 'pages/config/environment/store';
import requestStore from 'pages/deploy/request/store';

class LoginIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loginType: 'default'
    }
  }

  componentDidMount() {
    envStore.records = [];
    requestStore.records = [];
    requestStore.deploys = []
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, formData) => {
      if (!err) {
        this.setState({loading: true});
        formData['type'] = this.state.loginType;
        http.post('/api/account/login/', formData)
          .then(data => {
            if (!data['has_real_ip']) {
              Modal.warning({
                title: '安全警告',
                className: styles.tips,
                content: <div>
                  未能获取到客户端的真实IP，无法提供基于请求来源IP的合法性验证，详细信息请参考
                  <a target="_blank" href="https://spug.dev" rel="noopener noreferrer">官方文档</a>。
                </div>,
                onOk: () => this.doLogin(data)
              })
            } else {
              this.doLogin(data)
            }
          }, () => this.setState({loading: false}))
      }
    })
  };

  doLogin = (data) => {
    localStorage.setItem('token', data['access_token']);
    localStorage.setItem('nickname', data['nickname']);
    localStorage.setItem('is_supper', data['is_supper']);
    localStorage.setItem('permissions', JSON.stringify(data['permissions']));
    updatePermissions(data['is_supper'], data['permissions']);
    if (history.location.state && history.location.state['from']) {
      history.push(history.location.state['from'])
    } else {
      history.push('/welcome/index')
    }
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={styles.container}>
      	<div className={styles.mainContainer}>
					<div className={styles.titleContainer}>
						<p>
							<img className={styles.logo} src={logo} alt="logo"/>
							<font className={styles.title}>长征云运维系统</font>
						</p>
					</div>
					<div className={styles.formContainer}>
						<Form>
							<Form.Item className={styles.formItem}>
								{getFieldDecorator('username', {rules: [{required: true, message: '请输入账户'}]})(
									<Input
										size="large"
										autoComplete="off"
										placeholder="请输入账户"
										prefix={<Icon type="user" className={styles.icon}/>}/>
								)}
							</Form.Item>
							<Form.Item className={styles.formItem}>
								{getFieldDecorator('password', {rules: [{required: true, message: '请输入密码'}]})(
									<Input
										size="large"
										type="password"
										autoComplete="off"
										placeholder="请输入密码"
										onPressEnter={this.handleSubmit}
										prefix={<Icon type="lock" className={styles.icon}/>}/>
								)}
							</Form.Item>
						</Form>

						<Button
							block
							size="large"
							type="primary"
							className={styles.button}
							loading={this.state.loading}
							onClick={this.handleSubmit}>登录</Button>
					</div>
				</div>
        <div className={styles.footerZone}>
          <div style={{color: 'rgba(0, 0, 0, .45)'}}>Copyright <Icon type="copyright" /> 2020 航天新长征大道科技有限公司 v1.0</div>
        </div>
      </div>
    )
  }
}

export default Form.create()(LoginIndex)
