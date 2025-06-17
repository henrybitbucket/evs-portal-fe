import * as React from 'react';
import { BallBeat, SemiCircleSpin, Pacman, SquareSpin, BallRotate, BallSpinLoader, CubeTransition, BallClipRotate, BallSpinFadeLoader } from 'react-pure-loaders';
import { connect } from 'react-redux';

class ProgressLoading extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (

            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    left: '50%',
                    right: '50%',
                    top: '50%',
                    bottom: '50%',
                    transform: 'rotate(90deg)',
                    zIndex: 10000,
                    ...this.props.style,
                }}
            >
                <BallSpinFadeLoader
                  color={'#123abc'}
                  loading={true || this.props.loading}
                />
            </div>
		)
	}
}

const mapStateToProps = state => ({
    loading: state.header.loading,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressLoading);