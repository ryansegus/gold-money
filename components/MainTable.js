import MainTableListRow from './MainTableListRow'
const tableStyle = {
  display: 'grid',
  width: '100%',
  maxWidth: 300,
  margin: '0 auto',
  padding: 0,
  listStyle: 'none',
  background: '#EEE',
  boxShadow: '0px 3px 6px 1px rgba(133, 133, 133, 0.75)'
};

const MainTable = props => {
  const componentClass = 'c-table'
  return (
    /*
      To make a really nice sortable table is better to use a plugin like sortable :)
      https://github.hubspot.com/sortable/docs/welcome/ 
    */
  <div className={componentClass}>
    <div className={`${componentClass}__headers`}>
      <div className={`${componentClass}__header -rank`}>rank</div>
      <div className={`${componentClass}__header -symbol -visibleMd`}>symbol</div>
      <div className={`${componentClass}__header -name`}>name</div>
      <div className={`${componentClass}__header -price`}>price</div>
      <div className={`${componentClass}__header -market -visibleMd`}>market cap</div>
      <div className={`${componentClass}__header -priceChange -visibleMd`}>24h price change</div>
      <div className={`${componentClass}__header -qty -visibleMd`}>Qty</div>
      <div className={`${componentClass}__header -owned -visibleMd`}>Owned </div>
    </div>
    
    {
      Object.keys(props.criptoData).map((cripto, id) => {
          return (
            <MainTableListRow
              key={id}
              cripto={cripto}
              row={props.criptoData[cripto]}
              componentClass={componentClass}
            />
          )
        })
    }
    <style jsx global>{`

.c-table__headers {
    display: grid;
    grid-template-columns: repeat(3, minmax(70px, 1fr));
    grid-gap: 1px;
    background-color: cornflowerblue;
    color: white;
    align-items: center;
}

.c-table__header {
  border-right: 1px solid white;
  text-align: center;
  padding: 5px
}

.c-table__header:last-child {
  border-right: 0;
}

.c-table__header.-visibleMd {
  display: none;
}

.c-table__criptoRow {
  display: grid;
  grid-template-columns: repeat(3, minmax(70px, 1fr));
  grid-gap: 1px;
}

.c-table__criptoRow:nth-child(odd) {
  background: #eee;
}

.c-table__content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 5px;
  font-size: 13px;
}

.-decrease {
  color: #e60700;
}

.-increase {
  color: #77b300;
}

.c-table__content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 5px;
  font-size: 13px;
}

.c-table__content.-visibleMd {
  display: none;
}

/* I usually use a SCSS mixin to handle breakpoints */
@media screen and (min-width: 768px) {
  
  .c-table__headers {
    grid-template-columns: 60px 80px repeat(6,minmax(70px,1fr));
  }
  
  .c-table__criptoRow {
    grid-template-columns: 60px 80px repeat(6,minmax(70px,1fr));
  }
  
  .c-table__header.-visibleMd {
    display: block;
  }
  
  .c-table__content.-visibleMd {
    display: block;
  }
}

`}</style>
  </div>
  )
};

export default MainTable;