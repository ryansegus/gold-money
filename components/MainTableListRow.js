import React, { useState } from 'react';
import Link from 'next/link';
import _ from 'lodash';

const linkStyle = {
    textDecoration: 'underline'
};

const MainTableListRow = props => {
    const [ownedValue, setOwnedValue] = useState(_.ceil(props.row.priceUsd, 2));
    const priceStatus = (props.row.changePercent24Hr && props.row.changePercent24Hr.startsWith('-')) ? '-decrease' :  '-increase'

    return (
    <div className={`${props.componentClass}__criptoRow`}>
    <div className={`${props.componentClass}__content -rank`}>
        <a style={linkStyle}>{props.row.rank}</a></div>
    <div className={`${props.componentClass}__content -symbol -visibleMd`}>{props.row.symbol}</div>
    <div className={`${props.componentClass}__content -name`}>
        <Link href="/cripto-details/[id]" as={`/cripto-details/${props.row.id}`}>
            <a style={linkStyle} title={`see details of ${props.row.name}`}>{props.row.name}</a>
        </Link>
    </div>
    <div className={`${props.componentClass}__content -price`}>{props.row.priceUsd}</div>
    <div className={`${props.componentClass}__content -market -visibleMd`}>{props.row.marketCapUsd}</div>
    <div className={`${props.componentClass}__content -priceChange -visibleMd ${priceStatus}`}>{props.row.changePercent24Hr}</div>
    <div className={`${props.componentClass}__content -qty -visibleMd ${priceStatus}`}>
        {/* TODO: If we use a default value input type number won't work
            as expected, need further investigation */}
        <input type="number" min="1" max="1000" onChange={(e) => setOwnedValue(e.target.value * props.row.priceUsd)}/>
    </div>
    <div className={`${props.componentClass}__content -owned -visibleMd`}>{ownedValue}</div>
  </div>
  )
  
};

export default MainTableListRow;