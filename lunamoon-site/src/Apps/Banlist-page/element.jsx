export function BannedPlayerCell({ bannedNick, adminNick, reason, date, end, type }) {
    return (
        <>
            <tr>
                <th>{bannedNick}</th>
                <th>{adminNick}</th>
                <th>{reason}</th>
                <th>{date}</th>
                <th>{end}</th>
                <th>{type}</th>
            </tr>
        </>
    )
}