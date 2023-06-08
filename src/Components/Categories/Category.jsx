
import { useSearchParams } from "react-router-dom";
import "./Category.scss";
import { categorydata } from "./categorydata";
import { Link } from "react-router-dom";

export const Category = () => {

  const [searchParams]=useSearchParams();
  const category=searchParams.get('category');

  return (
    <div className="sidenav">
      <Link to={`/create?category=${category|| ''}`}><button>Create Blog</button></Link>
      <ul>
      <li><Link to ={`/?category=${''}`} className="link">All Categories</Link></li>
        {categorydata.map((item) => {
          return <li key={item.id}><Link to ={`/?category=${item.type}`} className="link">{item.type}</Link></li>;
        })}
      </ul>
    </div>
  );
};
