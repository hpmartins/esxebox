import React, { Component, useState, useRef, useContext, useEffect, useCallback } from 'react'
import { Col, Row } from 'reactstrap';
import  Visualize from './Visualize'

class YXRO extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col style={{width: '1vw', height: '40vh'}}>
            <Visualize />
          </Col>
        </Row>
      </div>
    )
  }
}

export default YXRO;
