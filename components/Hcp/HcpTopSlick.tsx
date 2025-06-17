import * as React from 'react';

import {
    getHCPs,
} from '@app/api/hcp';

class HcpTopSlick extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			product: this.props.product || {},
			mode: this.props.mode,
		}
	}

	shouldComponentUpdate(np, ns) {
		return !!this.state.update !== !!ns.update
	}

	componentDidMount() {
		this.fetchHCPs();
	}

	showSlides(index) {

		try {
			let e = this.e;
			if (!e) return;
			let divScrollContainer = e.querySelectorAll('.scroll-container-samcat')[0];
			if (!!divScrollContainer.isDrag) return;
			let slides = e.querySelectorAll('.img-slide-samecat');
			let dots = e.querySelectorAll('.dot');
			if (index < 0) {
				//index = slides.length - 1;//<- loop
				index = 0;
			}
			if (index >= slides.length) {
				index = 0;//<= loop
				//index = slides.length - 1
			}
			this.slideIndex = index;

			for (let i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(' active', '');
			}
			dots[index] && (dots[index].className += ' active');

			if (!!e.querySelectorAll('.img-slide-samecat')[index]) {

				//Dùng css
				let widthIndexToEnd = 0;
				for (let i = index - 1; i < slides.length; i++) {
					if (i >= 0)
					widthIndexToEnd += slides[i].offsetWidth;
				}
				let needTransform = widthIndexToEnd > slides[0].offsetParent.offsetWidth;
				for (let i = 0; i < slides.length; i++) {
					slides[i].style.transition = 'all 0.3s ease 0s';
					//slides[i].style.border = i == index ? '0.5px solid red' : 'none';
					if (needTransform) {
						//slides[i].style.transform = 'translate3d(-' + index * 100 + '%, 0px, 0px)';
					}
				}

				if (!divScrollContainer.isDrag) {
					let elmnt = divScrollContainer;
					let width = elmnt.offsetWidth;
					let pWidth = elmnt.parentElement.offsetWidth;
					let nextLeft = -index * slides[0].offsetWidth;
					if (nextLeft < pWidth - width) {
						nextLeft = pWidth - width;
					}
					if (nextLeft > 0) {
						nextLeft = 0;
					}

					let navLeft = e.parentElement.querySelectorAll('.nav-left')[0];
					if (nextLeft == 0 && navLeft) {
						navLeft.style.zIndex = -1;
						navLeft.style.display = 'none';
					} else if (pWidth < width) {
						navLeft.style.zIndex = 1;
						navLeft.style.display = 'flex';
					}

					let navRight = e.parentElement.querySelectorAll('.nav-right')[0];
					if (nextLeft > (pWidth - width) && navRight && pWidth < width) {
						navRight.style.zIndex = 1;
						navRight.style.display = 'flex';
					} else {
						navRight.style.zIndex = -1;
						navRight.style.display = 'none';
					}
					divScrollContainer.style.left = nextLeft + 'px';
				}

				//Dùng js
				//scrollAnimation(pE, document.querySelectorAll('.mySlides')[index].offsetLeft, 0, (!n && pE.scrollLeft > 1200) ? 0 : 200);
			}
		} catch(err) {}
	}

	plusSlides(n) {
		this.slideIndex = Number(this.slideIndex) || 0;
		n = Number(n) || 0;
		this.showSlides((this.slideIndex += n));
	}

	currentSlide(n) {
		this.slideIndex = Number(this.slideIndex) || 0;
		n = Number(n) || 0;
		this.showSlides((this.slideIndex = n));
	}

	dragElement(elmnt) {

		if (!elmnt) return;
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

		elmnt.onmousedown = dragMouseDown;
		let _this = this;

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			elmnt.style.transition = null;

			elmnt.isDrag = true;

			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			//elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

			let nextLeft = elmnt.offsetLeft - pos1;

			let width = elmnt.offsetWidth;
			let pWidth = elmnt.parentElement.offsetWidth;

			if (nextLeft <= 0 && nextLeft >= (pWidth - width)) {
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
		}

		function closeDragElement(e) {
			/* stop moving when mouse button is released:*/
			document.onmouseup = null;
			document.onmousemove = null;
			elmnt.style.transition = 'all 0.6s ease 0s';

			setTimeout(() => {
				elmnt.isDrag = false;
				try {
					let left = elmnt.style.left.replace(/(\.[0-9]+)*px/g, '');
					left = Number(left) || 0;
					if (left < 0) {
						left = -left;
					}

					let oldLeft = Number(elmnt.oldLeft || 0) || 0;
					let diffLeft = left - oldLeft;
					elmnt.oldLeft = left;
					let slides = elmnt.querySelectorAll('.img-slide');
					if (diffLeft < slides[0].offsetWidth) return;

					let cIndex = Math.round(left / slides[0].offsetWidth);
					_this.currentSlide(cIndex);
				} catch(err) {}
			}, 100)
		}
	}

	async fetchHCPs(query) {
		query = {...this.props.query, categoryIds: [this.props.categoryId], limit: 15, status: 'ACTIVE'};
		let res = await getHCPs(query);
		this.state.key = Date.now();
		res = res || {}
		res.response = res.response || {}
		res.data = res.response;
		if (res && res.data && res.data.results) {
			let index = null;
			res.data.results.map((it, i) => {
				if (it.code === this.props.productCode) {
					index = i;
				}
			})
			if (index !== null && index !== undefined) {
				res.data.results.splice(index, 1);
			}
			this.setState({hcps: res.data.results, update: true,}, () => this.currentSlide(0))
		}
	}

	render() {

		if (!this.state.hcps || !this.state.hcps.length) {
			return <div/>
		}
		return (
			<div style={{display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100px',
				maxWidth: '100%',
				width: '100%',
				flexDirection: 'column',
			}}>
				<style jsx>{`
					/* Track */
					.hide-scroll::-webkit-scrollbar {
						width: 0px;
						height: 0px;
					}
					.hide-scroll::-webkit-scrollbar-track {
						background: #f1f1f1;
					}

					/* Handle */
					.hide-scroll::-webkit-scrollbar-thumb {
						background: #888;
					}

					/* Handle on hover */
					.hide-scroll::-webkit-scrollbar-thumb:hover {
						background: #555;
					}
				`}</style>
				<div className='mobile-border-none mobile-p-0' style={{display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100px',
					maxWidth: '100%',
					width: '100%',
					//backgroundColor: '#ffffff',
					position: 'relative',
					//border: '0.5px solid rgb(233, 233, 233)',
					padding: '0.5px',
				}}>
					<div
						className="hide-scroll mobile-scroll"
						style={{
							display: 'flex',
							flexDirection: 'row',
							height: '270px',
							alignItems: 'center',
							overflow: 'hidden',
							//marginRight: '10px',
							//marginLeft: '10px',
							position: 'relative',
							width: '100%',
							overflowY: 'hidden',
						}}

						ref={ref => {
							this.e = ref;
							if (typeof window === 'object' && this.e) {
								this.dragElement(this.e.querySelectorAll('.scroll-container-samcat')[0]);
							}
						}}
					>
						<div className='scroll-container-samcat'
							style={{
								position: 'absolute',
								transition: 'all 0.6s ease 0s',
								left: '0px',
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							{
								([].concat(this.state.hcps))
								.map((it, index) => {
									return (
										<div className='img-slide-samecat'
											key={this.state.key + '_' + index}
											style={{

											}}
											onClick={() => {

												this.props.onClick && this.props.onClick(it);
											}}
										>
											<div key={index} width={430} height={258} data-test="top-browsable-doctors-doctor-card" className="sc-14lzapr-0 sc-1iqyrb6-0 deaENo" style={{ display: 'block', position: 'relative', backgroundColor: 'rgb(255, 255, 255)', minWidth: '430px', width: '430px', minHeight: '258px', height: '258px', borderRadius: '6px', margin: '0px 13px 5px 3px', boxSizing: 'border-box', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px', padding: '16px', transition: 'box-shadow 0.3s ease-in-out 0s', cursor: 'pointer' }}>
                                                <div className="sc-1iqyrb6-1 bAsQdw" style={{ display: 'inline-flex', flexDirection: 'row', cursor: 'pointer', height: '100px' }}>
                                                    <div data-test="doctor-card-photo" className="sc-1iqyrb6-2 frTuEz">
                                                        <div className="sc-8xv30k-5 ebldnk">
                                                            <div className="sc-8xv30k-2 eKXInv">
                                                                <div data-test="doctor-photo-lazy-load" className="sc-8xv30k-0 jMJumR">
                                                                    <div>
                                                                        <picture>
                                                                            <img alt="Dr. Mahyar Eidgah" data-test="doctor-card-photo-image" itemProp="image" src={it.avatar}
                                                                            loading="lazy"
                                                                            className="sc-8xv30k-4 juRkzR" style={{ width: '72px', height: '72px', borderRadius: '50%', }} />
                                                                        </picture>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sc-1iqyrb6-3 dusype" style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
                                                        <div data-test="doctor-card-info-name" className="haqnht-0 ipAijE" style={{ WebkitLineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', color: 'rgb(0, 35, 75)', font: '16px / 20px sharp-sans-bold, Arial, sans-serif', fontSize: '20px', lineHeight: '23px' }}>
                                                            <span data-test="doctor-card-info-name-full" itemProp="name">
                                                                {'Dr ' + it.firstName + ' ' + it.lastName}
                                                            </span>
                                                        </div>
                                                        <div data-test="doctor-card-provider-specialty" className="sc-1iqyrb6-4 gEnrux">
                                                            {it.speciality}
                                                        </div>
                                                        <div data-test="doctor-card-provider-location" className="sc-1iqyrb6-5 eGMvfc">
                                                            {it.city + ', ' + it.zipCode + ', ' + it.country}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="zbzy1h-0 iTpKdE" style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inherit', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', height: '86px', minHeight: '86px', flexDirection: 'column' }}>
                                                    <span data-test="doctor-card-rating" className="zbzy1h-1 gqsvbx" style={{ display: 'inline-flex', WebkitBoxAlign: 'center', alignItems: 'center', textAlign: 'left', justifyContent: 'center' }}>
                                                        <svg viewBox="0 0 51.6 43" className="sc-14oxdvn-0 zbzy1h-6 fHkQza" style={{ width: '20px', height: '20px' }}>
                                                            <svg data-test="doctor-card-rating-star" viewBox="0 0 43 40" className="sc-14oxdvn-0 uxxkcb-0 kCXcGp">
                                                                <path d="M32.2 40l-10.7-7.8L10.8 40l-3.7-2.7 4.1-12.6L.5 17l1.4-4.4h13.2L19.2 0h4.6l4.1 12.6h13.2l1.4 4.4-10.7 7.8 4.1 12.6-3.7 2.6z" fill="#FF6473" />
                                                            </svg>
                                                        </svg>
                                                    <span data-test="doctor-card-rating-number" className="zbzy1h-2 hgJovu" style={{ color: 'rgb(255, 100, 115)', font: '16px sharp-sans-bold, Arial, sans-serif', display: 'inline-block', fontWeight: 700, paddingTop: '4px' }}>
                                                        {Number(it.rating || 0).toFixed(1)}
                                                    </span>
                                                    <span data-test="doctor-card-review-count" className="zbzy1h-3 eDLZtn" style={{ paddingTop: '4px', marginLeft: '5px' }}>
                                                        (
                                                        <span className="zbzy1h-3 zbzy1h-4 fHqzYg">
                                                            {it.totalRating + ' ' + 'reviews'}
                                                        </span>
                                                        <span className="zbzy1h-3 zbzy1h-4 fHqzYg">
                                                            )
                                                        </span>
                                                    </span>
                                                </span>
                                                <div data-test="doctor-card-review" className="zbzy1h-5 dMVWpC" style={{ height: '37px', marginTop: '6px', font: '15px / 18px sharp-sans-medium, Arial, sans-serif', marginLeft: '5px', overflow: 'hidden' }}>
                                                    {it.shortIntro}
                                                </div>
                                            </div>
                                            <div data-test="doctor-card-view-all-availability" className="sc-1iqyrb6-6 iymZGf" style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', width: '100%', WebkitBoxPack: 'justify', justifyContent: 'space-between', font: '16px / 20px sharp-sans-semibold, Arial, sans-serif' }}>
                                                <div className="sc-1iqyrb6-7 gAMdqK">
                                                    View all upcoming availability
                                                </div>
                                                <div className="sc-1iqyrb6-8 dyGaKR">
                                                    <svg data-test="icon-arrow-right" viewBox="0 0 26 40" className="sc-14oxdvn-0 kt5wwf-1 kBYZZr" style={{ width: '20px', height: '20px' }}>
                                                        <polygon fill="#00234B" points="5.7,40 0.3,34.5 14.8,20 0.3,5.5 5.7,0 25.7,20" />
                                                    </svg>
                                                </div>
                                            </div>
                                            </div>
										</div>
									)
								})
							}
						</div>
					</div>
					<div className="mobile-none nav-left"
						style={{
							width: '50px',
							height: '50px',
							display: 'none' || 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							paddingLeft: '2.5px',
							position: 'absolute',
							left: '-7px',
							zIndex: -1,
						}}
					>
						<div
							style={{
								width: '35px',
								height: '35px',
								backgroundColor: '#ffffff',
								borderRadius: '59px',
								boxShadow: '0 1px 12px 0 rgba(0,0,0,.12)',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								fontSize: '18px',
								color: '#aaa',
								cursor: 'pointer',
							}}
							onClick={() => {
								this.plusSlides(-1);
							}}
						>
							<i
								className='fa fa-chevron-left'
								aria-hidden='true'
							/>
						</div>
					</div>
					<div className="mobile-none nav-right"
						style={{
							width: '50px',
							height: '50px',
							display: 'none' || 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							paddingRight: '2.5px',
							position: 'absolute',
							right: '-7px',
							zIndex: -1,
						}}
					>
						<div
							style={{
								width: '35px',
								height: '35px',
								backgroundColor: '#ffffff',
								borderRadius: '59px',
								boxShadow: '0 1px 12px 0 rgba(0,0,0,.12)',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								fontSize: '18px',
								color: '#aaa',
								cursor: 'pointer',
							}}
							onClick={() => {
								this.plusSlides(1);
							}}
						>
							<i
								className='fa fa-chevron-right'
								aria-hidden='true'
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export { HcpTopSlick };
