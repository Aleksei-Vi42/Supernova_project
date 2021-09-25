import React, {useState} from "react"
import classes from "./Paginator.module.css"
import classnames from "classnames"

export const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize

    return (
        <div className={classes.paginator}>
            {portionNumber > 1 && <href onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>. . . .</href>}


            {pages.filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map(p => {
                    return <span className={classnames ({
                        [classes.selectedPage]: currentPage === p
                    }, classes.pageNumber) }
                                 key={p}
                                 onClick={() => {
                                     onPageChanged(p)
                                 }}>{p}<span> </span></span>
                })}
            {portionCount > portionNumber && <href onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>. . . .</href>}
        </div>
    )
}