import * as React from 'react';
import { connect } from 'react-redux';
import css from 'styled-jsx/css';
import StarRatings from 'react-star-ratings';
import { Input, Pagination, ShowMore, Button } from '@app/components/Common';
import { toastrs } from '@app/utils/toastr';

import { tokenName } from '@app/utils/public-config';
import { getCookie, eraseCookie } from '@app/utils/cookie';

import { LoginKit } from '@app/components/Login';

import { getHCP, getHCPs, getAvailabilities, makeAppointment, review, getReviews } from '@app/api/hcp';

const toISOLocalString = (src) => {
	try {
		var date = new Date(src);
		if (!date || !date.getTime()) {
			if (src.indexOf('+') !== -1) {
				date = new Date(src.replace(/[+].*/g, ''));
			}
		}
		var timeZone = -new Date().getTimezoneOffset() / 60;
		date.setHours(date.getHours() + timeZone);
		return date.toISOString().replace('Z', '') + (timeZone > 0 ? '+' : '-') + (timeZone * timeZone > 81 ? '' : '0') + (timeZone) + '00';
    } catch(error){}
    return new Date(src).toDateString();
}

class ReviewForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { displayValue: {}, validate: {}, };
		this.state.doneStep = 1;

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
		this.setState({displayValue: {...this.state.displayValue}})
	}
	checkValidate() {
		let rs = true;
		if (!this.state.displayValue.title) {
			rs = false;
		}
		if (!this.state.displayValue.comment) {
			rs = false;
		}
		if (!this.state.displayValue.rating) {
			rs = false;
		}

		if (!rs) {
			this.state.validate.title = !!this.state.displayValue.title;
			this.state.validate.comment = !!this.state.displayValue.comment;

		}
		return rs;
	}

	render() {
		return (

			<div
				className="panel-body"
				style={{
					backgroundColor: "#ffffff",
					paddingBottom: '0px',
				}}
			>
				<form
					className="form-horizontal bv-form"
					role="form"
					id="address-info"
					noValidate="novalidate"
					style={{ maxWidth: "550px", }}
				>

					<div className="row">
						<div
							className="col-lg-12"
							style={{ position: "relative", paddingRight: "20px", display: 'flex', flexDirection: 'row', }}
						>
							<label style={{fontSize: '15px', marginRight: '10px',}}>
								1. Rate:
							</label>
							<StarRatings
								rating={this.state.displayValue.rating || 0}
								starDimension="15.5px"
								starSpacing="2.5px"
								starRatedColor="rgb(255, 193, 32)"
								starSelectingHoverColor="rgb(255, 193, 32)"
								starHoverColor="rgb(255, 193, 32)"
								changeRating={(e) => {
									this.setState({displayValue: {...this.state.displayValue, rating: e,}});
								}}
							/>
						</div>
					</div>

					<div className="form-group row">
						<div
							className="col-lg-12 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<label style={{fontSize: '15px',}}>
								2. Title:
							</label>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "title"
								}}
								name="title"
								value={this.state.displayValue.title}
								placeholder={"Title"}
								groupstyle={{ margin: "auto" }}
								onChange={value => this.handleChange('title', value)}
							/>
							{this.state.validate.title === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "40px", color: 'green', }}
							/>
							: null}
							{this.state.validate.title === false ?
							<small className="help-block"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								{'Title is required!'}
							</small>
							: null}
						</div>
					</div>
					<div className="form-group row">
						<div
							className="col-lg-12 input-wrap has-feedback has-success"
							style={{ position: "relative", paddingRight: "20px" }}
						>
							<label style={{fontSize: '15px',}}>
								3. Write your comment:
							</label>
							<Input
								key={this.state.refreshKey}
								field={{
									name: "comment"
								}}
								name="title"
								value={this.state.displayValue.comment}
								placeholder={"Content"}
								groupstyle={{ margin: "auto" }}
								textarea="true"
								style={{minHeight: '150px',}}
								onChange={value => this.handleChange('comment', value)}
							/>
							{this.state.validate.comment === true ?
							<i
								className="form-control-feedback bv-no-label fa fa-check"
								data-bv-icon-for="full_name"
								style={{ position: "absolute", right: 0, top: "40px", color: 'green', }}
							/>
							: null}
							{this.state.validate.comment === false ?
							<small className="help-block"
								style={{
									color: '#eb0000',
									fontSize: '12px',
									fontWeight: '400',
								}}
							>
								{'Content is required'}
							</small>
							: null}
						</div>
					</div>

					<div className="form-group row" style={{justifyContent: 'flex-end',}}>
						<div style={{marginRight: '20px',}}>
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
                                    if (!this.state.displayValue.rating) {
                                        this.state.displayValue.rating = 5;
                                    }
									if (!this.checkValidate()) {
										this.setState({displayValue: {...this.state.displayValue,}})
										return;
									}
									console.info(this.state.displayValue);
									this.setState({isSubmitting: true,}, async () => {

										let res = await review(
										    this.props.hcp.id,
											{...this.state.displayValue, productCode: this.props.productCode,}
										);
										if (res && !!res.success) {
										    toastrs.show('success', "Send comment successfully")
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

class ReviewItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			item: this.props.item || {status: 'ACTIVE'},
		}
	}

	componentDidMount() {

	}

	render() {
		let item = this.state.item;
		return (
			<div
				className=""
				style={{
					flex: 1,
					padding: '20px 0px',
				}}
			>
				<style jsx>
					{`
						.product-item:hover {
							box-shadow: 0px 10px 10px 0px rgba(200, 200, 200, 0.1),
								10px 0px 10px 0px rgba(200, 200, 200, 0.1),
								-10px 0px 10px 0px rgba(200, 200, 200, 0.1),
								0px -10px 10px 0px rgba(200, 200, 200, 0.1);
							//padding-top: 15px;
							//padding-bottom: 15px;
							padding: 15px;
							height: 240px;
							width: 150px;
							display: flex;
							flex-direction: column;
							cursor: pointer;
							background-color: #ffffff;
							z-index: 1,
						}
						.product-item {
							//padding-top: 15px;
							//padding-bottom: 15px;
							padding: 15px;
							height: 240px;
							width: 150px;
							display: flex;
							flex-direction: column;
							background-color: #ffffff;
						}
						.text-concat-2-line {
							position: relative;
							display: inline-block;
							word-wrap: break-word;
							overflow: hidden;
							max-height: 30px;
							line-height: 15px;
							text-align:justify;
                        }
					`}
				</style>
				<div style={{display: 'flex', fontSize: '16px',}}>
					<div style={{width: '160px', display: 'flex', flexDirection: 'column',}}>
						<div style={{height: '66px', margin: 'auto',}}>
							<img src={item.avatar || 'https://lh3.googleusercontent.com/-LfvhKVKIAUk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdmpqv8hF1oF_TtGbjMbqv2outfPA/s96-c/photo.jpg'} style={{width: '65px', height: '65px', borderRadius: '50%',}}/>
						</div>
						<div style={{height: '25px', margin: 'auto', fontWeight: '500',}}>
							<span>{item.fullName}</span>
						</div>
						<div style={{height: '25px', margin: 'auto', fontSize: '13px', color: '#999999',}}>
							<span>{toISOLocalString(item.commentDate).replace('T', ' ').substring(0, 19)}</span>
						</div>
					</div>
					<div style={{flex: 1, display: 'flex', flexDirection: 'column', paddingRight: '25px',}}>
						<div style={{ marginRight: '25px', whiteSpace: 'nowrap',}}>
							<StarRatings
								rating={Number(item.rating || 0)}
								starDimension="19.5px"
								starSpacing="2.5px"
								starRatedColor="rgb(255, 193, 32)"
							/>
						</div>
						<div style={{marginTop: '0px', display: 'none',}}>
							<i className="fa fa-check-square" style={{color: item.isBought ? '#22b345' : 'red', marginRight: '10px',}}/>
							<span>{item.isBought ? 'Đã mua sản phẩm này tại shop' : 'Chưa mua sản phẩm'}</span>
						</div>
						<div style={{marginTop: '15px', fontWeight: '500'}}>
							<span>{item.title}</span>
						</div>
						<div style={{marginTop: '0px',}}>
							<span>{item.comment}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class ReviewList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return (
			<div
				className='scrollbar-white'
				style={{
					marginLeft: '0px', marginRight: '0px', overflowX: 'auto', overflowY: 'hidden',
					paddingBottom: '25px',
					marginBottom: '15px',
				}}
			>
				<style jsx>{
					`
						tbody > tr:hover {
							background-color: #eeeeee;
						}
						tbody tr td {
							padding-top: 5px;
							padding-bottom: 5px;
							border-bottom: 0.5px solid #a1a1a1;
						}
					`
				}</style>

				<div
					style={{
						padding: '5px',
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					{
						(() => {

							if (this.props.items && !this.props.items.length) {
								return (
									<div><span>{'No result found!'}</span></div>
								)
							}

							return (this.props.items || []).map((item, index) => {
								return (
									<ReviewItem key={Date.now() + '_' + index} item={item} rowClick={this.props.rowClick} viewBy={this.props.viewBy}/>
								)
							})
						})()
					}
				</div>
			</div>
		)
	}
}

class HcpReview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			query: {},
		}
		this.props._ref && this.props._ref(this);
	}
	
	componentDidMount() {

		this.fetchHcpReviews();
	}

	async fetchHcpReviews(query) {
		query = {...this.state.query, ...query};
		delete query.totalRecords;
		delete query.totalPages;

		query.pageSize = query.pageSize || 5;
		query.offset = ((query.pageIndex || 1) - 1) * (query.pageSize);
		query.limit = (query.pageSize || 5);

		query.isVerified = true;
		let res = await getReviews(this.props.hcpId, query);
		res.data = res.response;
		res.data.options = this.props.hcp || {};
		console.info(this.props.hcp)
		this.state.key = Date.now();
		if (res && res.data && res.data.results) {

			query.totalRecords = Number(res.data.totalRows) || 0;
			query.totalPages = Math.floor((Number(query.totalRecords) + Number(query.pageSize || 5) - 1) / Number(query.pageSize || 5));
			this.setState({
				reviews: res.data.results,
				rating: res.data.rating || 0,
				totalReview: res.data.options.totalRating,
				review1s: res.data.options.rating1s || 0,
				review2s: res.data.options.rating2s || 0,
				review3s: res.data.options.rating3s || 0,
				review4s: res.data.options.rating4s || 0,
				review5s: res.data.options.rating5s || 0,
				query: {...query},
				key: Date.now(),
			})
		} else {
			query.totalRecords = 0;
			query.totalPages = 0;
			this.setState({
				reviews: [],
				rating: 0,
				totalReview: 0,
				review1s: 0,
				review2s: 0,
				review3s: 0,
				review4s: 0,
				review5s: 0,
				query: {...query},
			})
		}
	}	

	render() {

		let { review1s, review2s, review3s, review4s, review5s, totalReview } = this.state;
		console.info(this.state)
		let percent1s = Number((!totalReview ? 0 : 100 * review1s / totalReview).toFixed(0));
		let percent2s = Number((!totalReview ? 0 : 100 * review2s / totalReview).toFixed(0));
		let percent3s = Number((!totalReview ? 0 : 100 * review3s / totalReview).toFixed(0));
		let percent4s = Number((!totalReview ? 0 : 100 * review4s / totalReview).toFixed(0));
		let percent5s = !totalReview ? 0 : (100 - percent1s - percent2s - percent3s - percent4s);
		let avg = !!totalReview ? (review1s * 1 + review2s * 2 + review3s * 3 + review4s * 4 + review5s * 5) / totalReview : 0;
		avg = Number(avg).toFixed(1);
		return (
			<div
			    className="mobile-border-none mobile-p-0"
			    style={{display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				border: '0.5px solid #e9e9e9',
				padding: '1px',
			}}>
				<style jsx>{`
					input[type=number]::-webkit-inner-spin-button,
                    input[type=number]::-webkit-outer-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
				`}</style>

				<div className="row" style={{width: '100%',
					backgroundColor: '#ffffff',
					borderBottom: '0.5px solid #e9e9e9',
					padding: '35px 0px',
				}}>
					<div className="col-md-4 col-sm-12 col-12"
						style={{
							margin: 'auto',
							textAlign: 'center',
							marginBottom: '15px',
						}}
					>
						<div style={{fontWeight: '400', color: '#444444', fontSize: '17px',}}>
							<span>Avg. rating</span>
						</div>
						<div style={{fontWeight: '500', color: '#fe302e', fontSize: '47px',}}>
							<span>{(avg || 0) + ' / 5'}</span>
						</div>
						<StarRatings
							rating={Number(avg || 0)}
							starDimension="19.5px"
							starSpacing="2.5px"
							starRatedColor="rgb(255, 193, 32)"
						/>
						<div style={{fontWeight: '300', color: '#999999',}}>
							<span>{'(' + (this.state.totalReview || 0) + ' reviews)'}</span>
						</div>
					</div>
					<div className="col-md-4 col-sm-12 col-12"
						style={{
							padding: '0px 35px',
							marginBottom: '15px',
						}}
					>
						{
							[percent5s, percent4s, percent3s, percent2s, percent1s].map((item, index) => {
								return (
									<div key={index} style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}} k={Date.now()}>
										<span style={{marginRight: '5px',}}>{5 - index}</span><i className="fa fa-star"/>
										<div style={{flex: 1, backgroundColor: '#efefef', height: '10px', margin: '0px 10px',}}>
											<div style={{height: '100%', width: item + '%', backgroundColor: '#23b445',}}></div>
										</div>
										<div style={{width: '40px', textAlign: 'right'}}>
											<span style={{marginRight: '5px',}}>{item + '%'}</span>
										</div>
									</div>
								)
							})
						}
					</div>
					<div className="col-md-4 col-sm-12 col-12"
						style={{
							textAlign: 'center',
						}}
					>
						<div>
							<span>Share a comment</span>
						</div>
						<div className='fNAZIY' style={{
						    cursor: 'pointer',
						    borderRadius: '3px',
							margin: '5px 25px',
							padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
						}}
						onClick={() => {

							if (!!this.state.writeReview) {
								this.setState({writeReview: !this.state.writeReview})
							} else {
								let tk = getCookie(tokenName);
								if (!!tk) {
									this.setState({writeReview: !this.state.writeReview})
								} else {
									this.loginKit && this.loginKit.show();
								}
							}
						}}
						>
							<span>{!this.state.writeReview ? 'Write a comment' : 'Close'}</span>
						</div>
					</div>
				</div>

				<div
					style={{
						display: !!this.state.writeReview ? 'flex' : 'none',
						flexDirection: 'row',
						flex: 1,
						backgroundColor: '#ffffff',
						width: '100%',
						borderBottom: '0.5px solid #e9e9e9',
					}}
				>
					<div className="row" style={{width: '100%', margin: 0,}}>
						<div className="col-md-12"
							style={{
								marginTop: '10px',
							}}
						>
							<div>
								<ReviewForm key={this.state.key}
									items={this.state.reviews || []}
									hcp={this.props.hcp}
								/>
							</div>
						</div>
					</div>
				</div>

				<div
					style={{
						display: this.state.query.totalPages > 0  ? 'flex' : 'none',
						flexDirection: 'row',
						flex: 1,
						backgroundColor: '#ffffff',
						width: '100%',
					}}
				>
					<div className="row" style={{width: '100%',}}>
						<div className="col-md-12"
							style={{
								marginTop: '10px',
							}}
						>
							<div>
								<ReviewList key={this.state.key}
									items={this.state.reviews || []}
								/>
							</div>

							<div className="row mt-3">
								<div className="col-sm-12 pagination" style={{justifyContent: 'flex-end', marginBottom: '15px',}}>
									{ this.state.query.totalRecords > 1 && this.state.query.totalPages >= 2 &&
										<Pagination
											totalRecords={this.state.query.totalRecords}
											totalPages={this.state.query.totalPages}
											onPageChanged={(query) => {
												this.fetchHcpReviews(query);
											}}
											pageIndex={this.state.query.pageIndex}
											pageSize={this.state.query.pageSize}
										/>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<LoginKit
					_ref={ref => this.loginKit = ref}
					popup={true}
					onSuccess={() => {
						this.loginKit && this.loginKit.hide();
						this.setState({writeReview: true,})
					}}
				/>
			</div>
		);
	}
}

HcpReview = connect(
	state => {
		return {
		}
	},
	dispatch => {
    	return {
    	}
    }
)(HcpReview);

export { HcpReview };
