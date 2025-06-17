import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';
import { ProgressLoading } from '@app/components/Common';
import { IBasicComponentProps } from '@app/components/Types';
import I18nLink from '@app/components/I18nLink';
import { checkLoginedOrNot, redirect, checkLoginedOrNotAndIgnoreTrue } from '@app/utils/app-init';

import { UserForm } from './UserForm';
import { loadGoogleApi } from './utils';

import { socialLogin, login, getProfile, getMenuItems } from '@app/api/user';
import { preLogin, getOtp, resetPassword } from '@app/api/log';
import { tokenName } from '@app/utils/public-config';
import { setCookie, eraseCookie, getCookie } from '@app/utils/cookie';
const Swal = require('sweetalert2');

const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

class LoginKit extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isOn: !!this.props.isOn,
		}
	}

	async componentDidMount() {
		/*loadGoogleApi(async (isSignedIn, userInfo) => {

			if (!!this.state.isLoggedIn) {
				return;
			}

			if (!!isSignedIn && !!this.props.userInfo && !this.props.userInfo.userId) {
				let params = {
					accessToken: userInfo.accessToken,
					avatar: userInfo.picture,
					email: userInfo.email,
					firstName: userInfo.firstName,
					lastName: userInfo.lastName,
					type: 'google',
				}
				let res = await socialLogin(params);
				if (!res || !res.response || !res.response.token) {
					return;
				}
			}
		});

		this.props._ref && this.props._ref(this);
		let code = getParameterByName('code');
		if (!!code) {
			this.props.dispatch({ type: "HEADER_LOADING", payload: true });
			await this.signIn('normal', {code: code, grant_type: 'authorization_code'})
			this.props.dispatch({ type: "HEADER_LOADING", payload: false });
			return;
		}
		this.checkSSO();*/

		// const rp = await getSettings();
		// const settings = rp?.response?.results;
		//
		// if (settings && settings.filter(st => st.key === 'LOGIN_NORMAL_OTP' && (st.value || "").trim().toLowerCase() === 'on').length > 0) {
		// 	this.setState({showOtp: true, loading: false});
		// }
	}

	getPrevious(userId) {
		if (typeof localStorage == 'object') {
		  localStorage.removeItem('prev_id');
		  localStorage.setItem('prev_id', userId);
			let previousInfo = localStorage.getItem('prev_info');
			if (previousInfo === 'null' || previousInfo === 'undefined') {
			  previousInfo = '';
			}
			try {
			  previousInfo = JSON.parse(previousInfo);
			  previousInfo = previousInfo[userId + '']['url'];
			} catch(e) {
			  previousInfo = null;
			}
			localStorage.removeItem('prev_info');
			return (previousInfo || '').replace(window.location.origin, '');
		}
	}

	responseGoogle = async (userInfo) => {
		let params = {
			accessToken: userInfo.accessToken,
			avatar: userInfo.picture,
			email: userInfo.email,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			type: 'google',
		}
		let res = await socialLogin(params);
		if (res && res.response && res.response.token) {
			const token = `Bearer ${res.response.token}`;
			setCookie(tokenName, token);
			this.setState({
				userInfo: userInfo,
				isLoggedIn: 1,
			}, async () => {
				this.props.setUserInfo(this.state.userInfo);
				if (!this.checkSSO()) {
					if (!this.props.popup) {
						require('@app/utils/next-routes').Router.pushRoute(this.getPrevious() || '/');
					} else {
						this.props.onSuccess && this.props.onSuccess();
					}
				}
				this.setState({ loading: false, });
			});
		} else {
			this.setState({ loading: false, })
			try {
				window.gapi.auth2.getAuthInstance().signOut();
			} catch (err) {
				console.info(err);
			}
		}
	}

	async signIn(type, params) {

		await this.setState({ loading: true, })

		if (type == 'facebook' || type == 'zalo') {

			alert('Chưa hỗ trợ login bằng Facebook và Zalo')
			return;
		}

		if (type == 'normal') {

			try {
				params = params || {
					email: this.state.username,
					password: this.state.password,
					grant_type: 'password',
					otp: !!this.state.showOtp ? this.state.otp : null,
				}

				let res = await await fetch('api/v1/login', {
					method: 'POST',
					body: JSON.stringify(params),
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				res = await res.json();
				if (res && res.response && res.response.token) {
					const token = `Bearer ${res.response.token}`;
					setCookie(tokenName, token);
					res.response.appCodes = res.response.appCodes || [];

					const resMenuItems = await getMenuItems();
					await this.props.dispatch({type: 'MENU_ITEMS', payload: resMenuItems?.response})

					if (!this.checkSSO()) {
						if (!this.props.popup) {
						  if (res.response.appCodes.length > 1) {
							  this.setState({ openSelectSite: true, loading: false, appCodes: res.response.appCodes, userInfo: res.response });
							} else {
							  console.info('res.response.appCodes ====', res.response.appCodes, res.response.appCodes.indexOf['DMS'])
							  if (res.response.appCodes.indexOf('DMS') > -1) {
									setCookie('app_code', 'DMS');
                  require('@app/utils/next-routes').Router.pushRoute(this.getPrevious(res.response.id) || '/');
							  } else {
                  setCookie('app_code', res.response.appCodes[0] || 'MMS');
                  require('@app/utils/next-routes').Router.pushRoute(this.getPrevious(res.response.id) || '/');
							  }
							}
						} else {
							this.props.onSuccess && this.props.onSuccess();
							let resProfile = await getProfile();
							this.props.setUserInfo(resProfile.data);
						}
					}
				} else {
					Swal.fire({
						title: 'Error!',
						text: res.message || 'Username or password invalid!',
						icon: 'error',
						heightAuto: false,
					});
					this.setState({ loading: false, })
				}
			} catch (err) {
				this.setState({ loading: false, });
				console.info(err);
			}

			return;
		}
		if (type == 'google') {
			try {
				window.gapi.auth2.getAuthInstance().signIn()
					.then(response => {

						let profile = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
						let access_token = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
						let userInfo = {
							userId: profile.getId(),
							name: profile.getName(),
							firstName: profile.getGivenName(),
							lastName: profile.getFamilyName(),
							email: profile.getEmail(),
							picture: profile.getImageUrl(),
							accessToken: access_token,
						}
						this.responseGoogle(userInfo);
					})
					.catch(err => {
						console.info(err);
						this.props.setUserInfo({});
					})
			} catch (e) {
			}
			return;
		}
	}

	async getOtp(params) {
		await this.setState({ loading: true, });
		try {
			const rp = await getOtp(params);
			if (rp?.success) {
				Swal.fire({
					title: 'Success!',
					text: rp.message || "",
					icon: 'success',
					heightAuto: false,
				}).then((result) => {
					if (!!result.isConfirmed && params.actionType === 'reset_pwd') {
						this.setState({ resetPwdNextStep: true });
					}
				});
			} else {
				Swal.fire({
					title: 'Error!',
					text: rp.message || "",
					icon: 'error',
					heightAuto: false,
				});
			}
		} catch (err) {
			this.setState({ loading: false, });
			console.info(err);
		}
		this.setState({ loading: false, })
		return;
	}

	async resetPassword(params) {
		await this.setState({ loading: true, });
		try {
			const rp = await resetPassword(params);
			if (rp?.success) {
				Swal.fire({
					title: 'Success!',
					text: 'Password reset successfully! Return to login page',
					icon: 'success',
					heightAuto: false,
				}).then((result) => {
					if (!!result.isConfirmed) {
						window.location.reload();
					}
				});
			} else {
				Swal.fire({
					title: 'Error!',
					text: rp.message || '',
					icon: 'error',
					heightAuto: false,
				}).then((result) => {
					if (!!result.isConfirmed) {
						if (rp.message.includes('otp')) {
							this.setState({ errorOtp: rp.message })
						} else if (rp.message.includes("password invalid")) {
							this.setState({
								errorNewPwd: rp.message,
								errorConfirmPwd: rp.message,
							});
						}
					}
				});
			}
		} catch (err) {
			this.setState({ loading: false, });
			console.info(err);
		}
		this.setState({ loading: false, })
		return;
	}

	checkSSO() {

		let client_id = getParameterByName('client_id');
		let redirect_uri = getParameterByName('redirect_uri');
		let isTokenExisted = getCookie(tokenName, null) && getCookie(tokenName, 'LOGIN_INFO');
		if (!!client_id && !!redirect_uri && isTokenExisted) {
			let url = 'api/_/oauth2/authorize';
			url += '?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code';
			window.location.href = url;
			return true;
		}
		return false;
	}

	async checkAndSignIn() {
		if (!this.state.username || !this.state.password) {
			Swal.fire({
				title: 'Error!',
				text: 'User name and password are required!',
				icon: 'error',
				heightAuto: false,
			});
			return;
		}
		if (!this.state.showOtp) {
			await this.signIn('normal');
		} else {
			if (!this.state.otp) {
				Swal.fire({
					title: 'Error!',
					text: 'OTP is required!',
					icon: 'error',
					heightAuto: false,
				})
			} else {
				await this.signIn('normal')
			}
		}
	}

	async preLogin() {
		let rp = await preLogin({ username: this.state.username });
		if (!!rp.success) {
			this.setState({ showPassword: true });
			if (!!rp.response.loginOtpRequire) {
				this.setState({ showOtp: true })
			}
		} else {
			Swal.fire({
				title: 'Error!',
				text: rp.message,
				icon: 'error',
				heightAuto: false,
			});
		}
	}

	render0() {
		if (this.props.type === 'form-edit') {
			return <UserForm type={this.props.type} data={{ ...this.props.userInfo }} onSuccess={this.props.onSuccess}/>
		}

		return (
			!this.state.openSelectSite ? (
				<div id="login-box" style={{ maxWidth: '350px', width: '100%', margin: 'auto', }}>
					{!this.state.resetPwd ? (
						<div id="login-form" style={{ padding: '15px', backgroundColor: '#ffffff', borderRadius: '5px' }}>
							<div className="head" style={{
								background: 'url(https://salt.tikicdn.com/desktop/img/icon1.png) no-repeat',
								minHeight: '36px',
								padding: '0 0 0 50px',
								marginBottom: '25px'
							}}>
								<h2 style={{ color: 'rgba(0,0,0,.85)', fontSize: '19px', fontWeight: 300, margin: '1px' }}>Sign in</h2>
							</div>
							<form method="POST" className="content" onSubmit={(event) => event.preventDefault()}>
								<input type="hidden" name="TIKI_CSRF_TOKEN" defaultValue="K2djcGhZOEh2LzNMNUxTR0o4Y3k0UT09"
											 onChange={() => {
											 }}/>
								{!this.state.showPassword ? (
									<>
										<div className="form-group" style={{ padding: '0px !important', marginBottom: '5px' }}>
											<input
												value={this.state.username}
												className="form-control"
												onChange={(e) => {
													this.setState({
														username: e.target.value,
													})
												}}
												onKeyPress={(event) => {
													if (event.type === "keypress" && event.key === "Enter" && this.state.username) {
														this.preLogin();
													}
												}}
												type="text"
												placeholder="Email address"
												style={{
													lineHeight: 'unset',
													borderColor: 'unset !important',
													maxWidth: '320px !important',
													width: '100%',
													borderRadius: '3px',
													height: '32px',
													border: '0.5px solid #dddddd !important',
													paddingLeft: '15px',
													color: '#444',
													fontSize: '12px'
												}}
											/>
										</div>
										<div style={{ display: "flex", width: '100%', alignItems: "center", justifyContent: "flex-end" }}>
											<div
												style={{ cursor: "pointer", marginBottom: '10px', color: 'blue' }}
												onClick={() => {
													this.setState({ resetPwd: true })
												}}
											>
												Reset password
											</div>
										</div>
										<div className="form-group last">
											<button
												onClick={() => {
													this.preLogin();
												}}
												type="button" className="btn btn-info btn-block"
												name="nextStep"
											>{'Next >'}</button>
										</div>
									</>
								) : (
									<>
										<div className="form-group">
											<div className="form-group" style={{ padding: '0px !important' }}>
												<input
													value={this.state.username || ""}
													className="form-control"
													type="text"
													placeholder="Email address"
													style={{
														lineHeight: 'unset',
														borderColor: 'unset !important',
														maxWidth: '320px !important',
														width: '100%',
														borderRadius: '3px',
														height: '32px',
														border: '0.5px solid #dddddd !important',
														paddingLeft: '15px',
														color: '#444',
														fontSize: '12px',
														background: '#dbdbdb'
													}}
													disabled
												/>
											</div>
											<input
												value={this.state.password || ""}
												className="form-control"
												onChange={(e) => {
													this.setState({
														password: e.target.value,
													})
												}}
												onKeyPress={(event) => {
													if (event.type === "keypress" && event.key === "Enter") {
														this.checkAndSignIn();
													}
												}}
												type="password" name="password" id="password" autoComplete="off"
												placeholder="Password" style={{
												lineHeight: 'unset',
												borderColor: 'unset !important',
												maxWidth: '320px !important',
												width: '100%',
												borderRadius: '3px',
												height: '32px',
												border: '0.5px solid #dddddd !important',
												paddingLeft: '15px',
												color: '#444',
												fontSize: '12px'
											}}/>
										</div>
										<div style={{ display: 'none' }} className="form-group">
											<div id="login-recaptcha"/>
										</div>
										{this.state.showOtp && (
											<div className="form-group" style={{ padding: '0px !important' }}>
												<div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
													<input
														value={this.state.otp}
														className="form-control"
														onChange={(e) => {
															this.setState({
																otp: e.target.value,
															})
														}}
														type="text"
														placeholder="OTP"
														style={{
															lineHeight: 'unset',
															borderColor: 'unset !important',
															maxWidth: '320px !important',
															width: '100%',
															borderRadius: '3px',
															height: '32px',
															border: '0.5px solid #dddddd !important',
															paddingLeft: '15px',
															color: '#444',
															fontSize: '12px'
														}}
														onKeyPress={(event) => {
															if (event.type === "keypress" && event.key === "Enter") {
																this.checkAndSignIn();
															}
														}}
													/>
													<button
														onClick={() => {
															this.getOtp({ email: this.state.username, actionType: 'login', otpType: 'sms' });
														}}
														type="button"
														className="btn btn-info btn-block"
														style={{ width: '120px', height: '32px', fontSize: '12px', marginLeft: '10px' }}
														name="signIn"
													>Get OTP
													</button>
												</div>
											</div>
										)}
										<div className="form-group last" style={{ marginBottom: '5px' }}>
											<button
												onClick={async () => {
													this.setState({
														showPassword: false,
														otp: null,
														showOtp: false,
														password: null,
													});
												}}
												type="button" className="btn btn-info btn-block"
												name="signIn"
											>{'< Back'}</button>
										</div>
										<div className="form-group last">
											<button
												onClick={() => {
													this.checkAndSignIn();
												}}
												type="button" className="btn btn-info btn-block"
												name="signIn"
											>Log in
											</button>
										</div>
									</>
								)}
							</form>
						</div>
					) : (
						<div id="login-form" style={{ padding: '15px', backgroundColor: '#ffffff', borderRadius: '5px' }}>
							<div className="head" style={{ minHeight: '36px', marginBottom: '25px' }}>
								<h2 style={{
									color: 'rgba(0,0,0,.85)',
									fontSize: '19px',
									fontWeight: 300,
									margin: '1px',
									marginBottom: '25px'
								}}>Reset password</h2>
								{!this.state.resetPwdNextStep ? (
									<form method="POST" className="content">
										<div className="form-group" style={{ padding: '0px !important' }}>
											<input
												value={this.state.email || ""}
												className="form-control"
												onChange={(e) => {
													this.setState({
														email: e.target.value,
													})
												}}
												type="text"
												placeholder="Email address"
												style={{
													lineHeight: 'unset',
													borderColor: 'unset !important',
													maxWidth: '320px !important',
													width: '100%',
													borderRadius: '3px',
													height: '32px',
													border: '0.5px solid #dddddd !important',
													paddingLeft: '15px',
													color: '#444',
													fontSize: '12px'
												}}
											/>
										</div>
										<div className="form-group last">
											<button
												onClick={() => {
													if (!this.state.email) {
														Swal.fire({
															title: 'Error!',
															text: 'Email is required!',
															icon: 'error',
															heightAuto: false,
														});
													} else {
														this.getOtp({ email: this.state.email, actionType: 'reset_pwd', otpType: 'sms' })
													}
												}}
												type="button" className="btn btn-info btn-block"
												name="signIn"
											>{'Next >'}
											</button>
											<button
												onClick={() => {
													this.setState({
														resetPwd: false,
														email: null,
													});
												}}
												type="button" className="btn btn-info btn-block"
												name="signIn"
											>{'< Back'}
											</button>
										</div>
									</form>
								) : (
									<form method="POST" className="content">
										<div className="form-group" style={{ padding: '0px !important' }}>
											<input
												value={this.state.newPassword || ""}
												className="form-control"
												onChange={(e) => {
													this.setState({
														newPassword: e.target.value,
														errorConfirmPwd: null,
														errorNewPwd: null,
													})
												}}
												type="password"
												placeholder="New password"
												style={{
													lineHeight: 'unset',
													borderColor: 'unset !important',
													maxWidth: '320px !important',
													width: '100%',
													borderRadius: '3px',
													height: '32px',
													border: '0.5px solid #dddddd !important',
													paddingLeft: '15px',
													color: '#444',
													fontSize: '12px'
												}}
											/>
											{this.state.errorNewPwd ? (
												<small
													className="help-block"
													style={{
														color: '#eb0000',
														fontSize: '12px',
														fontWeight: '400',
													}}
												>
													{this.state.errorNewPwd}
												</small>
											) : null}
										</div>
										<div className="form-group" style={{ padding: '0px !important' }}>
											<input
												value={this.state.confirmNewPassword || ""}
												className="form-control"
												onChange={(e) => {
													this.setState({
														confirmNewPassword: e.target.value,
														errorConfirmPwd: null,
														errorNewPwd: null,
													})
												}}
												type="password"
												placeholder="Confirm new password"
												style={{
													lineHeight: 'unset',
													borderColor: 'unset !important',
													maxWidth: '320px !important',
													width: '100%',
													borderRadius: '3px',
													height: '32px',
													border: '0.5px solid #dddddd !important',
													paddingLeft: '15px',
													color: '#444',
													fontSize: '12px'
												}}
											/>
											{this.state.errorConfirmPwd ? (
												<small
													className="help-block"
													style={{
														color: '#eb0000',
														fontSize: '12px',
														fontWeight: '400',
													}}
												>
													{this.state.errorConfirmPwd}
												</small>
											) : null}
										</div>
										<div className="form-group" style={{ padding: '0px !important' }}>
											<div style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
												<input
													value={this.state.resetPwdOtp}
													className="form-control"
													onChange={(e) => {
														this.setState({
															resetPwdOtp: e.target.value,
															errorOtp: null
														})
													}}
													type="text"
													placeholder="OTP"
													style={{
														lineHeight: 'unset',
														borderColor: 'unset !important',
														maxWidth: '320px !important',
														width: '100%',
														borderRadius: '3px',
														height: '32px',
														border: '0.5px solid #dddddd !important',
														paddingLeft: '15px',
														color: '#444',
														fontSize: '12px'
													}}
												/>
												<button
													onClick={() => {
														this.getOtp({ email: this.state.email, actionType: 'reset_pwd', otpType: 'sms' });
													}}
													type="button"
													className="btn btn-info btn-block"
													style={{ width: '120px', height: '32px', fontSize: '12px', marginLeft: '10px' }}
													name="signIn"
												>Get OTP
												</button>
											</div>
											{this.state.errorOtp ? (
												<small
													className="help-block"
													style={{
														color: '#eb0000',
														fontSize: '12px',
														fontWeight: '400',
													}}
												>
													{this.state.errorOtp}
												</small>
											) : null}
										</div>
										<div className="form-group last">
											<button
												onClick={() => {
													if (!this.state.resetPwdOtp || (this.state.newPassword && this.state.confirmNewPassword && this.state.newPassword !== this.state.confirmNewPassword)
														|| (!this.state.newPassword || !this.state.confirmNewPassword)) {
														if (!this.state.resetPwdOtp) {
															this.setState({ errorOtp: "OTP is required!" });
														}
														if (this.state.newPassword && this.state.confirmNewPassword && this.state.newPassword !== this.state.confirmNewPassword) {
															this.setState({ errorConfirmPwd: "New password and confirm password does not match!" });
														}
														if (!this.state.newPassword) {
															this.setState({ errorNewPwd: "New password is required!" });
														}
														if (!this.state.confirmNewPassword) {
															this.setState({ errorConfirmPwd: "Confirm password is required!" });
														}
														return;
													}
													this.resetPassword({
														email: this.state.email,
														otp: this.state.resetPwdOtp,
														password: this.state.newPassword
													});
												}}
												type="button" className="btn btn-info btn-block"
												name="signIn"
											>Reset password
											</button>
											<button
												onClick={() => {
													this.setState({
														resetPwdNextStep: false,
														resetPwdOtp: null,
														newPassword: null,
														confirmNewPassword: null,
														errorOtp: null,
														errorNewPwd: null,
														errorConfirmPwd: null,
														email: null,
													});
												}}
												type="button" className="btn btn-info btn-block"
												name="signIn"
											>{'< Back'}
											</button>
										</div>
									</form>
								)}
							</div>
						</div>
					)}
					<UserForm _ref={ref => this.form = ref}/>
					{(this.state.loading) ?
						<ProgressLoading
							style={{ top: '180px', bottom: undefined, }}
						/>
						: null}
				</div>
			) : (
				<div id="login-box" style={{ maxWidth: '350px', width: '100%', margin: 'auto', }}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
						<button
							style={{
								height: '90px',
								width: '250px',
								border: '1px solid #5d81ab',
								background: '#80a9da',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								boxShadow: '0px 1px 1px rgba(255,255,255,0.8) inset, 1px 1px 3px rgba(0,0,0,0.2)'
							}}
							onClick={() => {
							  setCookie('app_code', 'MMS');
								require('@app/utils/next-routes').Router.pushRoute(this.getPrevious(this.state.userInfo?.id) || '/');
							}}
							type="button" className="btn btn-info btn-block btn-site"
							name="signIn"
						>
							<img src={'static/images/MMS.png'} style={{ width: '70px', objectFit: 'contain', marginRight: '5px' }}/>
							<div style={{ fontSize: '24px', fontWeight: 'bold' }}>{'Next'}</div>
							<i className="fa fa-arrow-right" style={{
								fontSize: '30px',
								marginLeft: '5px',
								borderLeft: '1px solid #5d81ab',
								display: 'flex',
								alignItems: 'center',
								padding: '10px',
								height: '100%'
							}}/>
						</button>
						<button
							style={{
								height: '90px',
								width: '250px',
								border: '1px solid #5d81ab',
								background: '#80a9da',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								boxShadow: '0px 1px 1px rgba(255,255,255,0.8) inset, 1px 1px 3px rgba(0,0,0,0.2)',
								marginTop: '20px'
							}}
							onClick={() => {
								setCookie('app_code', 'DMS');
								require('@app/utils/next-routes').Router.pushRoute('/');
							}}
							type="button" className="btn btn-info btn-block btn-site"
							name="signIn"
						>
							<img src={'static/images/DMS.png'} style={{ width: '70px', objectFit: 'contain', marginRight: '5px' }}/>
							<div style={{ fontSize: '24px', fontWeight: 'bold' }}>{'Next'}</div>
							<i
								className="fa fa-arrow-right"
								style={{
									fontSize: '30px',
									marginLeft: '5px',
									borderLeft: '1px solid #5d81ab',
									display: 'flex',
									alignItems: 'center',
									padding: '10px',
									height: '100%',
									color: !!this.state.mouseOverDms ? '#14f714' : 'white'
								}}
							/>
						</button>
					</div>
				</div>
			)
		);
	}

	hide() {
		this.setState({ isShowModal: false, loading: false, })
	}

	show() {
		this.setState({ isShowModal: true, })
	}

	render() {

		if (!this.props.popup)
			return this.render0();
		return (
			<Modal
				centered
				isOpen={this.state.isShowModal}
				toggle={this.handleToggle}
				style={{ zIndex: 3001, }}
				className='login-kit-popup'
			>
				<ModalBody>
					<div style={{
						position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px',
						borderRadius: '50%',
						cursor: 'pointer',
						backgroundColor: '#ffffff',
						boxShadow: 'rgb(150, 150, 150) -1px 1px 1px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
							 onClick={() => {
								 this.hide();
							 }}
					>
						<i className="fa fa-close"/>
					</div>
					{this.render0()}
				</ModalBody>
			</Modal>
		)
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.userInfo || {},
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setUserInfo: (userInfo) => dispatch({ type: 'SET_USER_INFO', payload: userInfo }),
		dispatch,
	}
};

LoginKit = connect(mapStateToProps, mapDispatchToProps)(LoginKit);

export { LoginKit };
