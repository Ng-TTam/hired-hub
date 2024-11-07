import '../../assets/css/Table.scss';

const ManageCandidate = () => {
    return (
        <table className='custom-table'>
            <thead>
                <tr>
                    <th>CV ứng viên</th>
                    <th>Thông tin CV</th>
                    <th>Insight</th>
                </tr>
            </thead>
            <tbody>
                {/* {jobs.map(job => (
                    <tr key={job.id}>
                        <td>{job.id}</td>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>{job.status}</td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    );
}

export default ManageCandidate;