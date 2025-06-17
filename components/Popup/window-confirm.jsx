import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody } from 'reactstrap'

class Confirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
			<Modal
				centered
				isOpen={true}
				toggle={() => {}}
				style={{zIndex: 3001,}}
				className='login-kit-popup'
			>
				<ModalBody>
				    <div style={{display: 'flex', flexDirection: 'column', minHeight: '150px'}}>
                        <div style={{position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            backgroundColor: '#ffffff',
                            boxShadow: 'rgb(150, 150, 150) -1px 1px 1px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                            onClick={async () => {
                                if (this.props.callback) {
                                    await this.props.callback({type: 'hide'});
                                }
                            }}
                        >
                            <i className="fa fa-close"/>
                        </div>
                        <div style={{
                            fontSize: '25px',
                            paddingLeft: '15px',
                            color: '#000',
                            fontWeight: '400',
                            //textAlign: 'center',
                        }}>
                            {this.props.title || 'Notification'}
                        </div>
                        <div style={{
                            flex: '1',
                            padding: '15px',
                            fontSize: '18px',
                            color: '#222',
                        }}>
                            {this.props.content}
                        </div>
                        <div style={{textAlign: 'right',}}>
                            <button className="btn btn-primary" type="button"
                                onClick={async () => {
                                    if (this.props.callback) {
                                        await this.props.callback({type: 'ok'});
                                    }
                                }}
                            >OK</button>
                        </div>
                    </div>
				</ModalBody>
			</Modal>
        )
    }
}


Confirm = connect((state) => {
    return {

    }
}, (dispatch, ownProps) => {
    return {
        dispatch,
    }
})(Confirm)

export {
    Confirm,
}