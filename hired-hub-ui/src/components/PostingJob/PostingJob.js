import React from "react";
import "../../assets/css/Table.scss";
import "./PostingJob.scss";
import Pagination from "../Pagination/Pagination";
import { BadgeInfoIcon, PenBoxIcon, SquareLibrary } from "lucide-react";

const PostingJob = () => {
  const postings = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "ABC Corp",
      location: "Hà Nội",
      status: "Mở",
    },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
    // {
    //   id: 2,
    //   title: "Backend Developer",
    //   company: "XYZ Ltd",
    //   location: "Đà Nẵng",
    //   status: "Đã đóng",
    // },
  ];

  const currentPage = 1;
  const totalPages = 3;
  const setCurrentPage = 1;

  return (
    <>
      {postings.length > 0 ? (
        <div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Tin tuyển dụng</th>
                <th>Công việc chính</th>
                <th>Công việc liên quan</th>
                <th>Ví trí</th>
                <th>Ngày đăng tin</th>
                <th>Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {postings.map((posting) => (
                <tr key={posting.id}>
                  <td>{posting.title}</td>
                  <td>{posting.company}</td>
                  <td>{posting.location}</td>
                  <td>{posting.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className="posting-nil">
          <PenBoxIcon size={100}/>
          <h1>Đăng tin ngay</h1>
          <span>
            &nbsp; Bạn chưa đăng tin tuyển dụng nào.
          </span>
          <span>Vui lòng chọn đăng tuyển để đăng tin tuyển dụng</span>
          <div className="post-button">
            <a href="">Đăng tuyển</a>
          </div>
        </div>
      )}
    </>
  );
};

export default PostingJob;
