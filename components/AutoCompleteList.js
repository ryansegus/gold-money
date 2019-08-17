const listStyle = {
    display: 'block',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 300,
    margin: '0 auto',
    padding: 0,
    listStyle: 'none',
    background: '#EEE',
    boxShadow: '0px 3px 6px 1px rgba(133, 133, 133, 0.75)'
};

const AutoCompleteList = props => (
    <div className='c-list'>
        <ul style={listStyle}>
            {props.list}
            <style jsx global>{`

                .c-list {
                    position:relative
                }

                .c-list__item {
                    padding: 10px;
                    border-bottom: 1px solid whitesmoke;
                    cursor: pointer;
                    transition: background-color 300ms;
                }

                .c-list__item:hover {
                    background-color: #DDD;
                }
                
            `}</style>
        </ul>
    </div>
);

export default AutoCompleteList;