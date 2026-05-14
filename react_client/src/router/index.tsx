import { Routes, Route } from "react-router";

const Home = () => <h1 className="title">Home Page</h1>;
const Products = () => <h1 className="title">Products Page</h1>;
const Calendar = () => <h1 className="title">Calendar Page</h1>;
const About = () => <h1 className="title">About Page</h1>;

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
}