class RotateMenu extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	open: false,
	    	timeGap: .05,
	    	radius: 150
	    };
	}
	handleMenuClick(ev) {
		this.setState({
			open: !this.state.open
		});
	}
	getLiNode(node) {
		while(node.classList.contains('item')) {
			node = node.parentNode;
		}
		return node;
	}
	handleItemClick(ev) {
		var node = this.getLiNode(ev.target);
		
		node.style.transition = '.3s ease';
		node.style.transform = 'scale(2) rotate(0deg)';
		node.style.opacity = '.1';
		//传入的参数fn，如果进行了作用域重定向，则解除事件绑定时会失效
		node.addEventListener('transitionend',this.transitionend,false);
	}
	transitionend() {
		this.style.transition = '.1s ease';
		this.style.transform = 'scale(1) rotate(0deg)';
		this.style.opacity = '1';
		this.removeEventListener('transitionend',this.transitionend,false);
	}
	renderChildren() {
		let {open, timeGap, radius} = this.state,
			length = this.props.items.length;
		return React.Children.map(this.props.items, (item, i) => {
			if(open) {
				var style = {
					transition: 'all .3s ease-in',
					transitionDelay: 0.1 * (length - i) + 's',
					top: -Math.sin((Math.PI / 8 * i))* radius + "px",
					right: Math.cos((Math.PI / 8 * i)) * radius + "px",
					transform: 'rotate(-360deg)',
				}
			}else {
				let [transform, right, top] = [i*timeGap, .35 + i*timeGap, .35 + i*timeGap];
				var style = {
					transition: 'transform .4s linear, right .3s ease, top .3s ease',
					transitionDelay: `${transform}s, ${right}s, ${top}s`
				}
			}
			return (
				<li style={style}
					dangerouslySetInnerHTML={{__html: item}}
				 	onClick={this.handleItemClick.bind(this)}>
				</li>
			);
		});
	}
	render() {
		let {open} = this.state,
			btnStyle = {
				transform: open ? null : 'rotate(-360deg)'
			};
		return (
			<div className="rotate-menu" ref="oMenu">
				<ul className="menu-items" ref="oUl">
					{this.renderChildren()}
				</ul>
				<span className="center-item" ref="oSpan" style={btnStyle}
					onClick={this.handleMenuClick.bind(this)}></span>
			</div>
		);
	}
}
ReactDOM.render(
	<RotateMenu items={[
		'<img src="lib/img/prev.png" alt=""/>',
		'<img src="lib/img/open.png" alt=""/>',
		'<img src="lib/img/clos.png" alt=""/>',
		'<img src="lib/img/full.png" alt=""/>',
		'<img src="lib/img/refresh.png" alt=""/>',
	]}/>,
	document.body
);