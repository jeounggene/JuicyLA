import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, getDatabase, child, ref, set } from "firebase/database";

async function getData(period) {
    let data = [];
    let rs = ['BruinPlate','DeNeve','Epicuria'];
    for(let i = 0; i < rs.length; i++) {
        await get(child(ref(getDatabase()), 'historic_ratings/' + period + '/' + rs[i])).then((snapshot)=>{
            data.push([rs[i],snapshot.val().count]);
        })
    }
    data.sort((a, b) => {
        if (a[1] > b[1]) {
            return -1;
        } else if (a[1] < b[1]) {
            return 1;
        }
        return 0;

    });
    return data;
}

function processData(data) {
    // data is: [(BruinPlate, 20), (Epicuria, 15), (DeNeve, 10)]
    //console.log(data);
    var finTable = "";
    finTable += "<table>";
    for(let i = 0; i < data.length; i++) {
        finTable += "<tr>";
        for(let j = 0; j < 2; j++) {
            finTable += "<td>";
            finTable += data[i][j];
            finTable += "</td>";
        }
        finTable += "</tr>";
    }
    finTable += "</table>";
    return finTable;
}

function tableData(period) {
    try {
        const reference = ref(getDatabase(),'leaderboard_html/' + period);
        getData(period).then((re) => {
            let pd = processData(re);
            get(reference).then((snapshot) => {
                if(!snapshot.exists() || snapshot.val().html != pd) {
                    set(reference, {
                        html: pd
                    })
                }
            })
        })
    } catch {
        console.log("Failed to get table.");
    }
}

const HistoricTable = ({period}) => {
    const[table, setTable] = useState(null);
    useEffect(() => {
        tableData(period);
        const r = ref(getDatabase(),'leaderboard_html/' + period);
        get(r).then((snapshot)=>{
            let t = snapshot.val().html;
            setTable(t);
        })
    },[])
    return(
        table && (<div dangerouslySetInnerHTML={{__html: table}} />)
    );
}

HistoricTable.propTypes = {
    period: PropTypes.string.isRequired,
}

export default HistoricTable;