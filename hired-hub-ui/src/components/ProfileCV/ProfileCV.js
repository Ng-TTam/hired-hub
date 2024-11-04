import React from "react";
import BoxBlock from "./BoxBlock/BoxBlock";
import image from "../../assets/images/index";
import CVList from "./CVList/CVList";

function ProfileCV() {
    return(
        <BoxBlock
            titleBox={"CV đã tạo"}
            action={"Tạo mới"}
            noCvImage = {image.noCVImage}
            cvList={CVList}
        />
    );
}

export default ProfileCV;