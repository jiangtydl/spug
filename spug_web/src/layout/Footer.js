/**
 * Copyright (c) OpenSpug Organization. https://github.com/openspug/spug
 * Copyright (c) <spug.dev@gmail.com>
 * Released under the MIT License.
 */
import React from 'react';
import { Layout, Icon } from 'antd';
import styles from './layout.module.css';


export default class extends React.Component {
  render() {
    return (
      <Layout.Footer style={{padding: 0}}>
        <div className={styles.footerZone}>
          <div style={{color: 'rgba(0, 0, 0, .45)'}}>
            Copyright <Icon type="copyright"/> 2020 航天新长征大道科技有限公司 v1.0
          </div>
        </div>
      </Layout.Footer>
    )
  }
}
