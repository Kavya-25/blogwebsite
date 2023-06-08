import { useState ,useEffect,useContext} from "react";
import "./CreateBlog.scss";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import {API} from '../../services/api'
import {DataContext} from '../../context/DataProvider'

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

export const CreateBlog = () => {
  const [post, setPost] = useState(initialPost);
  const [photo,setPhoto]=useState('');

  const location=useLocation();

  const {account}=useContext(DataContext)

  const handlepostchange=(e)=>{
    setPost({...post,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    const getImage=async()=>{
        if(photo){
            const data= new FormData();
            data.append("name",photo.name)
            data.append("photo",photo)

            // API CALL
            const response =await API.uploadFile(data)
            post.photo=''
        }
        getImage();
        post.categories=location.search?.split('=')[1] || 'All';
        post.username=account.username
        
    }

  },[photo])

  return (
    <div className="createblog">
      <img
        src="https://images.pexels.com/photos/9655624/pexels-photo-9655624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <form action="">
        <div className="field">
          <label htmlFor="fileInput">
            <BsFillPlusCircleFill className="choose" />
          </label>
          <input type="file" id="fileInput" hidden onChange={(e)=>setPhoto(e.target.files[0])}/>

          <input
            type="text"
            name="title"
            id=""
            placeholder="Title"
            value={initialPost.title}
            onChange={handlepostchange}
          />
        </div>
        <textarea
          name="description"
          value={initialPost.description}
          id=""
          cols="30"
          rows="10"
          placeholder="Tell your story"
          onChange={handlepostchange}
        ></textarea>
        <button>Publish</button>
      </form>
    </div>
  );
};
