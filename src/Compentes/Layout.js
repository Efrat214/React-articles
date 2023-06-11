import { Outlet, Link } from "react-router-dom";
import { fa } from "translate-google/languages";

const Layout = () => {
  return (
    <>
      <nav>
        <ul hidden={true}>
          <li>
            <Link to="/">main</Link>
          </li>
          <li>
            <Link to="/pdfff">pdfff</Link>
          </li>
          <li>
            <Link to="/signin">signin</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/pdf">uploadPdf</Link>
          </li>
          <li>
            <Link to="/test">test</Link>
          </li>
          <li>
            <Link to="/translate">translate</Link>
          </li>
          <li>
            <Link to="/menu">menu</Link>
          </li>
          <li>
            <Link to="/getallcategories">translate</Link>
          </li>
          <li>
            <Link to="/viewpdf">viewerPDF</Link>
          </li>
          <li>
            <Link to="/GetAllArticals">pdf</Link>
          </li>
          <li>
            <Link to="/addCategory">addCategory</Link>
          </li>
          <li>
            <Link to="/profile">addCategory</Link>
          </li>
          <li>
            <Link to="/user">addCategory</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;






