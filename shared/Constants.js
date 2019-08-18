module.exports = Object.freeze({
    inputStyle : {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 300,
        margin: '0 auto',
        padding: 20,
        fontSize: 20
      },
      
      seoHidden : {
        position: 'absolute',
        left: -10000,
        top: 'auto',
        width: 1,
        height: 1,
        overflow: 'hidden'
      },

      ellipsisText: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }
  });
