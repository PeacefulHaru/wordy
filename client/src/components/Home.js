import React from 'react';

// React-Bootstrap Import
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Home extends React.Component {
  render() {
    return (
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Place your parsing targets here</Form.Label> 
        <Button onClick={this.props.handleSubmit}>Parse it!</Button>
        <br />
        <br />
        <div key="checkboxYear" className="mb-3">
          <Form.Check inline label="2017" onClick={this.props.onClickCheckbox} name="checkboxYear" value="2017" id="yearCheckbox1" />
          <Form.Check inline label="2018" onClick={this.props.onClickCheckbox} name="checkboxYear" value="2018" id="yearCheckbox2" />
          <Form.Check inline label="2019" onClick={this.props.onClickCheckbox} name="checkboxYear" value="2019" id="yearCheckbox3" />
          <Form.Check inline label="2020" onClick={this.props.onClickCheckbox} name="checkboxYear" value="2020" id="yearCheckbox4" />
          <Form.Check inline label="default" onClick={this.props.onClickCheckbox} name="checkboxYear" value="default" id="yearCheckbox5" />

        </div>

        <div key="checkboxSem" className="mb-3" >
          <Form.Check inline label="1st semester" onClick={this.props.onClickCheckbox} name="checkboxSem" value="1"id="semCheckbox1"/>
          <Form.Check inline label="2nd semester" onClick={this.props.onClickCheckbox} name="checkboxSem" value="2" id="semCheckbox2" />
          <Form.Check inline label="3rd semester" onClick={this.props.onClickCheckbox} name="checkboxSem" value="3" id="semCheckbox3" />
          <Form.Check inline label="4th semester" onClick={this.props.onClickCheckbox} name="checkboxSem" value="4" id="semCheckbox4" />
          <Form.Check inline label="default" onClick={this.props.onClickCheckbox} name="checkboxSem" value="default" id="semCheckbox5" />

        </div>
        
        <Form.Label>KOREAN</Form.Label> 
        <Form.Control style={{marginBottom: 15}} name="parsetarget" as="textarea" rows="4" onChange={this.props.onChange}/>
        <Form.Label>ENGLISH</Form.Label> 
        <Form.Control style={{marginBottom: 15}} name="parsetargetEnglish" as="textarea" rows="4" onChange={this.props.onChange}/>
        <Form.Label>CHINESE</Form.Label> 
        <Form.Control style={{marginBottom: 15}} name="parsetargetChinese" as="textarea" rows="4" onChange={this.props.onChange}/>
        <Form.Label>JAPANESE</Form.Label> 
        <Form.Control style={{marginBottom: 15}} name="parsetargetJapanese" as="textarea" rows="4" onChange={this.props.onChange}/>

      </Form.Group>      
    );
  };
}

export default Home;