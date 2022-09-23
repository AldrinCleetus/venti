const Stats = ({name,count}) => {
    return ( 
        <div className="column py-0 m-0 fade-up-animation">
            <div className="stats-value-container has-text-white p-5 rounded" >
                <div className="count is-size-2-fullhd is-size-5 is-size-7-mobile">
                    {count}
                </div>
                <div className="status-name is-size-8 has-text-primary">
                    {name}
                </div>
                </div>
        </div>
     );
}
 
export default Stats;