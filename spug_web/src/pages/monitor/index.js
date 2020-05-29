/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the MIT License.
 */
import React from 'react';
import { observer } from 'mobx-react';
import { SearchForm, AuthDiv, AuthCard } from 'components';

export default observer(function () {
  return (
		<div className="iframe-container" style={{width: '100%', height: '100%'}}>
			<iframe
				id="iframeZabbix"
				title="study"
				src="http://39.99.211.6:3001/d/rlG4dJzGz/zabbix-template-linux-server?orgId=1&var-group=A1.%E6%9E%81%E7%AE%80%E5%B7%A5%E4%B8%9A&var-host=123321yun-cdbserver1&var-netif=All&from=now-3h&to=now&theme=light&kiosk"
				width="100%"
				height="100%"
				frameBorder="0">
			</iframe>
		</div>
  )
})
