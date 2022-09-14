const Stats = ({name,id,count}) => {
    return ( 
        <div className="stats-container has-text-white p-5 rounded" id={id}>
            
            <div className="count is-size-2">
                {count}
            </div>

            <div className="status-name has-text-primary">
                {name}
            </div>
        </div>
     );
}
 
export default Stats;