import { useEffect, useState } from "react";
import { imageLinks } from "./imageLinks";

export default function FoodImage({
name,
className = "",
detail = false
}) {
const [failed, setFailed] = useState(false);

const image = imageLinks[name];

useEffect(() => {
setFailed(false);
}, [name]);

if (!image || failed) {
return (
<div className={"${className} food-image-placeholder"}>
<strong>{name}</strong>
<small>Image unavailable</small>
</div>
);
}

return (
<img
className={className}
src={image}
alt={name}
loading={detail ? "eager" : "lazy"}
onError={() => setFailed(true)}
/>
);
}