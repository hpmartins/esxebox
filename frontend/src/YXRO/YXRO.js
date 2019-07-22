import React, { Component } from 'react'
import { Col, Row } from 'reactstrap';
import  Visualize from './Visualize'

class YXRO extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Visualize />
          </Col>
        </Row>
      </div>
    )
  }
}

export default YXRO;
