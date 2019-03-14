import React, {Component} from 'react'
import {Row, Col, Input} from 'antd'

class RuleBoard extends Component {
  
  render(){
    return(
      <Row>
        <Input.TextArea rows={4}>
          Write your rule sets here
        </Input.TextArea>
      </Row>
    )
  }
}

export default RuleBoard