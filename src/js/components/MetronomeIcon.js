'use strict'

export default class MetronomeIcon extends React.Component {
  constructor (props) {
    super(props)
    this.height = props.height
    this.width = props.width
    this.handleClick = props.onClick.bind(this)
  }

  render () {
    return (
      <svg viewBox="0 0 1000 1000" version="1.1" width={this.width} height={this.height} onClick={this.onClick}>
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0" />
            <stop offset="100%" style="stop-color:#428bca;stop-opacity:1" />
          </radialGradient>
        </defs>
        <rect x="150" y="150" rx="20" ry="20" width="700" height="700" style="fill:url(#grad1);stroke:black;stroke-width:5;opacity:0.5"/>
        <path d="M380 780a400,800 1 0 0 20,20L580 800a580,780 1 0 0 20,-20L750 200L250 200z M430 680a440,690 1 0 0 10,10L540 690a550,700 1 0 0 10,-10L680 250L320 250z" stroke="blue" stroke-width="2" fill="white" fill-rule="evenodd"></path>
        <path d="M475 680L680 300L710 300L505 680z" stroke="blue" stroke-width="2" fill="white"></path>
      </svg>
    )
  }
}
