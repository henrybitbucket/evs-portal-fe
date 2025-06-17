import * as React from 'react';
import css from 'styled-jsx/css';
import Router from 'next/router';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { CopyToClipBoard, SkeletonPlaceholder, Avatar, Button, Input, SelectCustom, Radio, DatePicker } from '@app/components/Common';
import { IBasicComponentProps } from '@app/components/Types';
import I18nLink from '@app/components/I18nLink';
import { toastrs } from '@app/utils/toastr';

import { socialLogin, login, getProfile } from '@app/api/user';
import { tokenName } from '@app/utils/public-config';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';

import { createUser, updateUser, sendForgotPassword, resetPassword } from "@app/api/user";

const styles = css`
    :global(.user-form .form-group) {
        margin-bottom: 5px !important;
    }
    :global(.user-form .form-group.row) {
        margin-bottom: 15px !important;
    }
`

class InternalUserForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { displayValue: {...this.props.data}, validate: {}, };
		this.state.doneStep = 1;
		this.state.editMode = !this.props.address || !this.props.address.length;

		this.props._ref && this.props._ref(this);
	}

	componentDidMount() {
		this.props._ref && this.props._ref(this);
	}

	show() {
		this.setState({
			isShowModal: true,
			refreshKey: Date.now(),
		})
	}
	hide() {
		this.setState({
			isShowModal: false,
		})
	}
	
	handleChange(field, value) {
		
		this.state.displayValue[field] = value;
		this.validate(field);
		this.setState({displayValue: {...this.state.displayValue}})
	}

	validate(field) {

		let value = this.state.displayValue[field];
		if (field === 'lastName') {
			this.state.validate.lastName = !!value && !!value.trim().length;
		}
		if (field === 'firstName') {
			this.state.validate.firstName = !!value && !!value.trim().length;
		}
		if (field === 'phone') {
			this.state.validate.phone = !!value && !!value.trim().length && (/^(\+){0,1}[0-9]{10,11}$/g.test(value.trim()));
		}
		if (field === 'email') {
			this.state.validate.email = !!value && !!value.trim().length && (/^([a-z0-9_\-]+\.){0,}[a-z0-9_\-]+@([a-z0-9_\-]+\.){1,}[a-z0-9_\-]+$/g.test(value.trim()));
		}

		if (this.props.type !== 'form-edit' || !!this.state.displayValue.changePassword) {
			if (field === 'password') {
				this.state.validate.password = !!value
				//&& value.trim().length >= 8
				//&& (/^.*([!@#$%^&*()+]+).*$/g.test(value.trim()))
				//&& (/^.*([a-z]+).*$/g.test(value.trim()))
				//&& (/^.*([A-Z]+).*$/g.test(value.trim()))
				//&& (/^.*([0-9]+).*$/g.test(value.trim()))
				;
			}
			if (field === 'password1') {
				this.state.validate.password1 = !!value
				&& value.trim().length >= 8;
			}
			if (field === 'password2') {
				this.state.validate.password2 = !!value
				&& value.trim().length >= 8
				&& value.trim() == this.state.displayValue.password1.trim();
			}
		}

		if (field === 'birthDay') {
			this.state.validate.birthDay = !!value;
		}

		if (field === 'gender') {
			this.state.validate.gender = value !== undefined;
		}
	}

	checkValidate() {
		let rs = true;
		this.validate('lastName');
		this.validate('firstName');
		this.validate('phone');
		this.validate('email');
		this.validate('gender');
		this.validate('birthDay');
		this.validate('password');
		if (this.props.type === 'form-edit' && !!this.state.displayValue.changePassword) {
			this.validate('password1');
			this.validate('password2');
		}

		if (!this.state.validate.lastName
			|| !this.state.validate.firstName
			|| !this.state.validate.phone
			|| !this.state.validate.email
			|| !this.state.validate.gender
			|| !this.state.validate.birthDay) {
			rs = false;
		}

		if (this.props.type !== 'form-edit' || !!this.state.displayValue.changePassword) {
			rs = rs && !!this.state.validate.password;
		}

		if (this.props.type === 'form-edit' && !!this.state.displayValue.changePassword) {
			if (!this.state.validate.password
				|| !this.state.validate.password1
				|| !this.state.validate.password2) {
				rs = false;
			}
		}

		return rs;
	}

	render() {
		let doneStep = this.state.doneStep || 0;
		return (

			<div
				className="panel-body user-form"
				style={{
					border: "0.5px solid #cccccc",
					backgroundColor: "#ffffff",
					paddingBottom: '0px',
					maxWidth: '600px',
					margin: 'auto',
					...this.props.style,
				}}
			>
			    <style jsx>{styles}</style>
				<form
					className="form-horizontal bv-form"
					role="form"
					id="address-info"
					noValidate="novalidate"
					style={{ maxWidth: "550px", margin: this.props.margin || "auto" }}
				>
					<button
						type="submit"
						className="bv-hidden-submit"
						style={{ display: "none", width: "0px", height: "0px" }}
					/>

					<div className="form-group row">
						<label
							htmlFor="full_name"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
							Name
							<span
								style={{
								    marginLeft: '3px',
                                    marginTop: '2px',
                                    color: 'red',
								}}
							>*</span>
						</label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "lastName"
								}}
								name="lastName"
								placeholder={"Last name"}
								groupstyle={{ margin: "auto" }}
								value={this.state.displayValue.lastName}
								onChange={value => this.handleChange('lastName', value)}
							/>
							{this.state.validate.lastName === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
							/>
							: null}
							{this.state.validate.lastName === false ?
							<small
								className="help-block"
								data-bv-for="full_name"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								Last name is required!
							</small>
							: null}
						</div>
					</div>
					<div className="form-group row">
						<label
							htmlFor="full_name"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						></label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "firstName"
								}}
								name="phone"
								placeholder={"First name"}
								value={this.state.displayValue.firstName}
								groupstyle={{ margin: "auto" }}
								onChange={value => this.handleChange('firstName', value)}
							/>
							{this.state.validate.firstName === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green',}}
							/>
							: null}
							{this.state.validate.firstName === false ?
							<small
								className="help-block"
								data-bv-for="full_name"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								First name is required!
							</small>
							: null}
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="telephone"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
							Phone
							<span
								style={{
									marginLeft: '3px',
									marginTop: '2px',
									color: 'red',
								}}
							>*</span>
						</label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "phone"
								}}
								name="phone"
								value={this.state.displayValue.phone}
								placeholder={"+17300000000"}
								groupstyle={{ margin: "auto" }}
								onChange={value => this.handleChange('phone', value)}
							/>
							{this.state.validate.phone === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
							/>
							: null}

							{this.state.validate.phone === false ?
							<small
								className="help-block"
								data-bv-validator="stringLength"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								{(!this.state.displayValue.phone || !this.state.displayValue.phone.trim().length) ? 'Phone is required!' : 'Phone invalid!'}
							</small>
							: null}
						</div>
					</div>
					<div className="form-group row">
						<label
							htmlFor="telephone"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
							Email
							<span
								style={{
								    marginLeft: '3px',
                                    marginTop: '2px',
                                    color: 'red',
								}}
							>*</span>
						</label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "email"
								}}
								name="email"
								value={this.state.displayValue.email}
								placeholder={"Email"}
								groupstyle={{ margin: "auto" }}
								onChange={value => this.handleChange('email', value)}
								readOnly={this.props.type === 'form-edit'}
							/>
							{this.state.validate.email === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
							/>
							: null}
							{this.state.validate.email === false ?
							<small className="help-block"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								{(!this.state.displayValue.email || !this.state.displayValue.email.trim().length) ? 'Email is required!' : 'Email invalid!'}
							</small>
							: null}
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="telephone"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
							Birthday
							<span
								style={{
								    marginLeft: '3px',
                                    marginTop: '2px',
                                    color: 'red',
								}}
							>*</span>
						</label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<DatePicker
								key={this.state.refreshKey}
								field={{
									name: "birthDay"
								}}
								name="birthDay"
								value={this.state.displayValue.birthDay}
								placeholder="dd/MM/yyyy"
								groupstyle={{ margin: "auto" }}
								onChange={(field, value) => this.handleChange('birthDay', value)}
							/>
							{this.state.validate.birthDay === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
							/>
							: null}
							{this.state.validate.birthDay === false ?
							<small className="help-block"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								Birthday is required!
							</small>
							: null}
						</div>
					</div>

					<div
						className="form-group row form-group-radio group-radio-k-address"
						style={{ display: undefined }}
					>
						<label
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
							Gender
							<span
								style={{
								    marginLeft: '3px',
                                    marginTop: '2px',
                                    color: 'red',
								}}
							>*</span>
						</label>
						<div className="col-lg-8 input-wrap has-feedback">
							<div className="radio radio-float">
								<label
									htmlFor="delivery_address_type_1"
									className="icheck-wrap"
								>
									<div
										className="iradio_square-blue checked"
										style={{ position: "relative" }}
									>
										<Radio
											field={{
												name: "radio1"
											}}
											name="radio1"
											className="radio-inline"
											groupstyle={{ margin: "auto", fontSize: '13px' }}
											value={(() => {
												if (this.state.displayValue.gender === 'male') return 'male';
												if (this.state.displayValue.gender === 'female') return 'female';
												if (this.state.displayValue.gender === 'other') return 'other';
											})()}
											options={[
												...[
													{ name: "Male", id: 'male' },
													{ name: "Female", id: 'female' },
													{ name: "Other", id: 'other' },
												].map(item => ({
													label: item.name,
													value: item.id
												}))
											]}
											onClick={(e, option) => {

												let gender = null;
												if (!!option) {
													if (option.value === 'male')
													gender = 'male';
													if (option.value === 'female')
													gender = 'female';
													if (option.value === 'other')
													gender = 'other';
												}

												this.handleChange('gender', gender)
											}}
										/>
									</div>
								</label>
							</div>

							<div className="clearfix" />

							{this.state.validate.gender === false ?
							<small
								className="help-block"
								data-bv-for="delivery_address_type"
								data-bv-result="NOT_VALIDATED"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								Gender is required!
							</small>
							: null}
						</div>
					</div>

					{this.props.type === 'form-edit' ?
					<div className="form-group row">
						<label
							htmlFor="telephone"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
						</label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px", display: 'flex', alignItems: 'center', display: 'none',}}
						>
							<input type="checkbox"

								onChange={(event) => {
									this.state.displayValue.changePassword = !!event.target.checked;
									this.setState({displayValue: this.state.displayValue,})
								}}
							/>
							<span style={{marginLeft: '5px',}}>Change password</span>
						</div>
					</div>
					: null}

					<div style={{display: (this.props.type !== 'form-edit' || !!this.state.displayValue.changePassword) ? undefined : 'none',
						borderTop: '0.5px solid #e9e9e9',
						paddingTop: '15px',
						//borderBottom: '0.5px solid #e9e9e9',
						paddingBottom: '15px',
						marginBottom: '15px',
					}}>
						<div className="form-group row">
							<label
								htmlFor="telephone"
								className="col-lg-4 control-label visible-lg-block"
								style={{
									fontSize: "12px",
									textAlign: "left",
									fontWeight: 500,
									color: "#222222"
								}}
							>
								Password
								<span
									style={{
										marginLeft: '3px',
										marginTop: '2px',
										color: 'red',
									}}
								>*</span>
							</label>
							<div
								className="col-lg-8 input-wrap has-feedback has-success"
								style={{ position: "relative", paddingRight: "20px" }}
							>
								<Input
									key={this.state.refreshKey}
									field={{
										name: "password"
									}}
									name="password"
									type="password"
									value={this.state.displayValue.password}
									placeholder={"Password"}
									groupstyle={{ margin: "auto" }}
									onChange={value => this.handleChange('password', value)}
								/>
								{this.state.validate.password === true ?
								<i
									className="form-control-feedback bv-no-label fa fa-check"
									data-bv-icon-for="full_name"
									style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
								/>
								: null}
								{this.state.validate.password === false ?
								<small className="help-block"
									style={{
										color: '#eb0000',
										fontSize: '12px',
										fontWeight: '400',
									}}
								>
									{(!this.state.displayValue.password || !this.state.displayValue.password.trim().length) ? 'Password is required!'
									:
									('Password must be at least 8 characters.') || ('Password must contain special characters, lowercase letters, uppercase letters, at least 8 characters.')
									}
								</small>
								: null}
							</div>
						</div>

						{!!this.state.displayValue.changePassword ?
						<div className="form-group row">
							<label
								htmlFor="telephone"
								className="col-lg-4 control-label visible-lg-block"
								style={{
									fontSize: "12px",
									textAlign: "left",
									fontWeight: 500,
									color: "#222222"
								}}
							>
								New password
								<span
									style={{
										marginLeft: '3px',
										marginTop: '2px',
										color: 'red',
									}}
								>*</span>
							</label>
							<div
								className="col-lg-8 input-wrap has-feedback has-success"
								style={{ position: "relative", paddingRight: "20px" }}
							>
								<Input
									key={this.state.refreshKey}
									field={{
										name: "password1"
									}}
									name="password1"
									type="password"
									value={this.state.displayValue.password1}
									placeholder={"New password"}
									groupstyle={{ margin: "auto" }}
									onChange={value => this.handleChange('password1', value)}
								/>
								{this.state.validate.password1 === true ?
								<i
									className="form-control-feedback bv-no-label fa fa-check"
									data-bv-icon-for="full_name"
									style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
								/>
								: null}
								{this.state.validate.password1 === false ?
								<small className="help-block"
									style={{
										color: '#eb0000',
										fontSize: '12px',
										fontWeight: '400',
									}}
								>
									{(!this.state.displayValue.password1 || !this.state.displayValue.password1.trim().length) ? 'Password is required!'
									:
									('Password must be at least 8 characters.') || ('Password must contain special characters, lowercase letters, uppercase letters, at least 8 characters.')
									}
								</small>
								: null}
							</div>
						</div>
						: null}

						{!!this.state.displayValue.changePassword ?
						<div className="form-group row" style={{marginBottom: 0}}>
							<label
								htmlFor="telephone"
								className="col-lg-4 control-label visible-lg-block"
								style={{
									fontSize: "12px",
									textAlign: "left",
									fontWeight: 500,
									color: "#222222"
								}}
							>
								Confirm password
								<span
									style={{
										marginLeft: '3px',
										marginTop: '2px',
										color: 'red',
									}}
								>*</span>
							</label>
							<div
								className="col-lg-8 input-wrap has-feedback has-success"
								style={{ position: "relative", paddingRight: "20px" }}
							>
								<Input
									key={this.state.refreshKey}
									field={{
										name: "password2"
									}}
									name="password2"
									type="password"
									value={this.state.displayValue.password2}
									placeholder={"Confirm password"}
									groupstyle={{ margin: "auto" }}
									onChange={value => this.handleChange('password2', value)}
								/>
								{this.state.validate.password2 === true ?
								<i
									className="form-control-feedback bv-no-label fa fa-check"
									data-bv-icon-for="full_name"
									style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
								/>
								: null}
								{this.state.validate.password2 === false ?
								<small className="help-block"
									style={{
										color: '#eb0000',
										fontSize: '12px',
										fontWeight: '400',
									}}
								>
									{(!this.state.displayValue.password2 || !this.state.displayValue.password2.trim().length) ? 'password is required!'
									:
									(this.state.displayValue.password2.trim().length < 8 ? 'Password must be at least 8 characters' : 'The password doesn\'t match')
									}
								</small>
								: null}
							</div>
						</div>
						: null}
					</div>

					<div className="form-group row">
						<div className="col-lg-4"></div>
						<div className="col-lg-8">
							<Button
								color="primary"
								type="button"
								className="btn btn-primary btn-custom3"
								value="update"
								isSubmitting={this.state.isSubmitting}
								style={{
									paddingTop: "8px",
									paddingBottom: "8px",
									borderRadius: "2px",
									fontSize: "13px",
									outlineColor: "#ccc",
									display: "inline-block",
									width: "50%",
									background: "#00b6f0",
									borderColor: "transparent",
									color: "#fff"
								}}

								onClick={() => {

									if (!this.checkValidate()) {
										this.setState({displayValue: {...this.state.displayValue,}})
										return;
									}
									this.setState({isSubmitting: true,}, async () => {

										let fn = typeof this.state.displayValue.id === 'number' ? updateUser : createUser;
										if (!this.state.displayValue.username || typeof this.state.displayValue.id !== 'number') {
											this.state.displayValue.username = this.state.displayValue.email;
										}
										let res = await fn(
											this.state.displayValue
										);
										if (res && res.success == true) {
											if (typeof this.state.displayValue.id !== 'number') {
												alert("Account creation is successful!");
												this.props.onSuccess && this.props.onSuccess();
											} else {
												toastrs.show('success', "Account update is successful");
												this.props.onSuccess && this.props.onSuccess();
											}
										} else {
											alert(res.message);
										}
										this.setState({isSubmitting: false,})
									})
								}}
							>
								{typeof this.state.displayValue.id === 'number' ? 'Update' : 'Sign up'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

class EmailForgotForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { displayValue: {}, validate: {}, };
		this.state.doneStep = 1;
		this.state.editMode = !this.props.address || !this.props.address.length;

		this.props._ref && this.props._ref(this);
	}

	componentDidMount() {
		this.props._ref && this.props._ref(this);
	}

	show() {
		this.setState({
			isShowModal: true,
			refreshKey: Date.now(),
		})
	}
	hide() {
		this.setState({
			isShowModal: false,
		})
	}

	handleChange(field, value) {

		this.state.displayValue[field] = value;

		if (field === 'email') {
			this.state.validate.email = !!value && !!value.trim().length && (/^([a-z0-9_\-]+\.){0,}[a-z0-9_\-]+@([a-z0-9_\-]+\.){1,}[a-z0-9_\-]+$/g.test(value.trim()));
		}
		if (field === 'password') {
			this.state.validate.password = !!value
			&& value.trim().length >= 8
			//&& (/^.*([!@#$%^&*()+]+).*$/g.test(value.trim()))
			//&& (/^.*([a-z]+).*$/g.test(value.trim()))
			//&& (/^.*([A-Z]+).*$/g.test(value.trim()))
			//&& (/^.*([0-9]+).*$/g.test(value.trim()))
			;
		}
		this.setState({displayValue: {...this.state.displayValue}})
	}
	checkValidate() {
		let rs = true;
		if (!this.state.validate.email) {
			rs = false;
		}

		if (!rs) {
			this.state.validate.email = !!this.state.validate.email;

		}
		return rs;
	}

	render() {
		return (

			<div
				className="panel-body"
				style={{
					border: "0.5px solid #cccccc",
					backgroundColor: "#ffffff",
					paddingBottom: '0px',
				}}
			>
				<form
					className="form-horizontal bv-form"
					role="form"
					id="address-info"
					noValidate="novalidate"
					style={{ maxWidth: "550px", margin: "auto" }}
				>
					<button
						type="submit"
						className="bv-hidden-submit"
						style={{ display: "none", width: "0px", height: "0px" }}
					/>
					<div className="form-group row">
						<div
							className="col-lg-12 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<label
								htmlFor="telephone"
								className="control-label visible-lg-block"
								style={{
									fontSize: "12px",
									textAlign: "left",
									fontWeight: 500,
									color: "#222222",
									fontSize: '25px',
								}}
							>
								Forgot password ?
							</label>
						</div>
					</div>
					<div className="form-group row">
						<div
							className="col-lg-12 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<span
								htmlFor="telephone"
								className="control-label visible-lg-block"
								style={{
									fontSize: "12px",
									textAlign: "left",
									fontWeight: 500,
									color: "#222222",
									fontSize: '15px',
								}}
							>
								<span
									style={{
										marginLeft: '3px',
										marginTop: '2px',
									}}
								>Please enter the your email address</span>
							</span>
						</div>
					</div>
					<div className="form-group row">
						<div
							className="col-lg-12 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "email"
								}}
								name="email"
								value={this.state.displayValue.email}
								placeholder={"email"}
								groupstyle={{ margin: "auto" }}
								onChange={value => this.handleChange('email', value)}
							/>
							{this.state.validate.email === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
							/>
							: null}
							{this.state.validate.email === false ?
							<small className="help-block"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								{(!this.state.displayValue.email || !this.state.displayValue.email.trim().length) ? 'email is required' : 'Email invalid'}
							</small>
							: null}
						</div>
					</div>

					<div className="form-group row">
						<div style={{margin: 'auto',}}>
							<Button
								color="primary"
								type="button"
								className="btn btn-primary btn-custom3"
								value="update"
								isSubmitting={this.state.isSubmitting}
								style={{
									paddingTop: "8px",
									paddingBottom: "8px",
									borderRadius: "2px",
									fontSize: "13px",
									outlineColor: "#ccc",
									display: "inline-block",
									width: "50%",
									background: "#00b6f0",
									borderColor: "transparent",
									color: "#fff",
									width: '150px',
								}}

								onClick={() => {

									if (!this.checkValidate()) {
										this.setState({displayValue: {...this.state.displayValue,}})
										return;
									}
									this.setState({isSubmitting: true,}, async () => {

										let res = await sendForgotPassword(
											this.state.displayValue.email
										);
										if (res && res.code == 200) {
											alert("Password recovery code was sent to your email address");
											this.props.onSuccess && this.props.onSuccess();
										} else {
											alert(res.message);
										}
										this.setState({isSubmitting: false,})
									})
								}}
							>
								{'Send'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

class ResetPasswordForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { displayValue: {forgotToken: this.props.forgotToken,}, validate: {}, };

		this.props._ref && this.props._ref(this);
	}

	componentDidMount() {
		this.props._ref && this.props._ref(this);
	}

	show() {
		this.setState({
			isShowModal: true,
			refreshKey: Date.now(),
		})
	}
	hide() {
		this.setState({
			isShowModal: false,
		})
	}

	handleChange(field, value) {

		this.state.displayValue[field] = value;

		if (field === 'password1') {
			this.state.validate.password1 = !!value
			&& value.trim().length >= 8;
		}
		if (field === 'password2') {
			this.state.validate.password2 = !!value
			&& value.trim().length >= 8
			&& value.trim() == this.state.displayValue.password1.trim();
		}
		this.setState({displayValue: {...this.state.displayValue}})
	}
	checkValidate() {
		let rs = true;
		if (!this.state.validate.password1
			|| !this.state.validate.password2) {
			rs = false;
		}

		if (!rs) {
			this.state.validate.password1 = !!this.state.validate.password1;
			this.state.validate.password2 = !!this.state.validate.password2;

		}
		return rs;
	}

	render() {
		return (

			<div
				className="panel-body"
				style={{
					border: "0.5px solid #cccccc",
					backgroundColor: "#ffffff",
					paddingBottom: '0px',
				}}
			>
				<form
					className="form-horizontal bv-form"
					role="form"
					id="address-info"
					noValidate="novalidate"
					style={{ maxWidth: "550px", margin: "auto" }}
				>
					<button
						type="submit"
						className="bv-hidden-submit"
						style={{ display: "none", width: "0px", height: "0px" }}
					/>
					<div className="form-group row">
						<label
							htmlFor="telephone"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
							Mật khẩu mới
							<span
								style={{
									marginLeft: '3px',
									marginTop: '2px',
									color: 'red',
								}}
							>*</span>
						</label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "password1"
								}}
								name="password1"
								type="password"
								value={this.state.displayValue.password1}
								placeholder={"Nhập mật khẩu mới"}
								groupstyle={{ margin: "auto" }}
								onChange={value => this.handleChange('password1', value)}
							/>
							{this.state.validate.password1 === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
							/>
							: null}
							{this.state.validate.password1 === false ?
							<small className="help-block"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								{(!this.state.displayValue.password1 || !this.state.displayValue.password1.trim().length) ? 'Vui lòng nhập password'
								:
								('Password có ít nhất 8 ký tự') || ('Password phải chứa kí tự đặc biệt, chữ thường, chữ hoa, ít nhất 8 ký tự')
								}
							</small>
							: null}
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="telephone"
							className="col-lg-4 control-label visible-lg-block"
							style={{
								fontSize: "12px",
								textAlign: "left",
								fontWeight: 500,
								color: "#222222"
							}}
						>
							Xác nhận mật khẩu
							<span
								style={{
									marginLeft: '3px',
									marginTop: '2px',
									color: 'red',
								}}
							>*</span>
						</label>
						<div
							className="col-lg-8 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "password2"
								}}
								name="password2"
								type="password"
								value={this.state.displayValue.password2}
								placeholder={"Nhập lại mật khẩu"}
								groupstyle={{ margin: "auto" }}
								onChange={value => this.handleChange('password2', value)}
							/>
							{this.state.validate.password2 === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "10px", color: 'green', }}
							/>
							: null}
							{this.state.validate.password2 === false ?
							<small className="help-block"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								{(!this.state.displayValue.password2 || !this.state.displayValue.password2.trim().length) ? 'Vui lòng nhập password'
								:
								(this.state.displayValue.password2.trim().length < 8 ? 'Password có ít nhất 8 ký tự' : 'Mật khẩu không khớp')
								}
							</small>
							: null}
						</div>
					</div>

					<div className="form-group row">
						<div style={{margin: 'auto',}}>
							<Button
								color="primary"
								type="button"
								className="btn btn-primary btn-custom3"
								value="update"
								isSubmitting={this.state.isSubmitting}
								style={{
									paddingTop: "8px",
									paddingBottom: "8px",
									borderRadius: "2px",
									fontSize: "13px",
									outlineColor: "#ccc",
									display: "inline-block",
									width: "50%",
									background: "#00b6f0",
									borderColor: "transparent",
									color: "#fff",
									width: '150px',
								}}

								onClick={() => {

									if (!this.checkValidate()) {
										this.setState({displayValue: {...this.state.displayValue,}})
										return;
									}
									this.setState({isSubmitting: true,}, async () => {

										let res = await resetPassword({...this.state.displayValue})
										if (res && res.code == 200) {
											alert("Reset mật khẩu thành công");
											this.props.onSuccess && this.props.onSuccess();
											require('@app/utils/next-routes').Router.pushRoute('/customer/account/login');
										} else {
											alert(res.message);
										}
										this.setState({isSubmitting: false,})
									})
								}}
							>
								{'Gửi'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

class UserForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {type: this.props.type,};
		this.state.data = this.props.data || {};
		this.state.popup = !!this.props.popup;
		this.props._ref && this.props._ref(this);
	}

	componentDidMount() {
		this.props._ref && this.props._ref(this);
	}

	show(type, data) {
		this.setState({
			isShowModal: true,
			refreshKey: Date.now(),
			type: type,
			data: data,
		})
	}
	hide() {
		this.setState({
			isShowModal: false,
		})
	}

	render() {

		if (this.state.type === 'form-edit' && !this.state.popup) {
			return <InternalUserForm key={this.state.refreshKey}
				onSuccess={() => {
				    this.hide();
				    this.props.onSuccess && this.props.onSuccess();
                }}
				style={{...this.props.style}}
				margin={this.props.margin}
				data={this.state.data}
				type='form-edit'
			/>
		}
		return (
			<div key={this.state.refreshKey}>
				<Modal
					centered
					isOpen={this.state.isShowModal}
					toggle={this.handleToggle}
					style={{zIndex: 3001,}}
				>
					<ModalBody>
						<div style={{position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px',
							borderRadius: '50%',
							cursor: 'pointer',
							backgroundColor: '#ffffff',
							boxShadow: 'rgb(150, 150, 150) -1px 1px 1px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
							onClick={() => {this.hide();}}
						>
							<i className="fa fa-close"/>
						</div>
						{this.state.type === 'send-forgot' ?
						<EmailForgotForm key={this.state.refreshKey}
							onSuccess={() => this.hide()}
						/>
						: null}
						{this.state.type === 'reset-password' ?
						<ResetPasswordForm key={this.state.refreshKey}
							onSuccess={() => this.hide()}
							forgotToken={this.props.token}
						/>
						: null}
						{this.state.type === 'registry' ?
						<InternalUserForm key={this.state.refreshKey}
							onSuccess={() => this.hide()}
							type={this.state.type}
						/>
						: null}
						{(this.state.type === 'form-edit' && !!this.state.popup) ?
						<InternalUserForm key={this.state.refreshKey}
							onSuccess={() => this.hide()}
							style={{...this.props.style}}
							margin={this.props.margin}
							data={this.state.data}
							type='form-edit'
						/>
						: null}
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {}
};

const mapDispatchToProps = dispatch => {
	return {

	}
};

UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);

export { UserForm };
