import React, { forwardRef, useState, useEffect } from 'react';
import { Button, IconButton, Grid, Box } from '@mui/material';
import { buttonSX, CusTextIconButton, CusIconButton } from './CusButton'
import { Delete, Edit, Visibility, CloudUpload } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const CusUploadImgFile = (props) => {

  const fileHandler = (e) => {
    props.onChangeEvent(e)
  }

  return (
    <React.Fragment>
      <Button
        id={props.id}
        sx={buttonSX}
        component="label"
        className={props.className}
        disabled={props.disabled}
        margin={props.margin}
        style={props.style}
        variant={props.variant}
        color={props.color}
        onClick={props.onClick}
        size={props.size}>
        選擇圖片
        <input type="file" multiple={props.multiple} style={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: 1,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: 0,
          whiteSpace: 'nowrap',
          width: 1
        }}
          onChange={e => {
            if (!e.target.value) return;
            fileHandler(e);
          }} />
      </Button>
    </React.Fragment>
  );
};

CusUploadImgFile.defaultProps = {
  id: '',
  className: '',
  disabled: false,
  margin: 'normal',
  style: {},
  variant: 'outlined',
  color: "primary",
  size: 'medium',
  multiple: false,
};

CusUploadImgFile.prototype = {
  id: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.string,
  color: PropTypes.string,
  multiple: PropTypes.bool,
};

// 含上傳功能的圖片預覽
const CusUploadImgFilePreview = (props) => {
  let { fileName, url, description, id, onChangeEvent, getSize, SxStyle, type, accept, uploadFunc, deleteFunc } = props
  const [propsObj, setPropsObj] = useState(null);
  const [imgSize, setImgSize] = useState({ height: 0, width: 0 })

  useEffect(() => {
    setPropsObj((prevData) => ({
      ...prevData,
      fileName: fileName === "" ? null : fileName,
      imagePreviewUrl: url
    }))

  }, [fileName])

  useEffect(() => {
    if (getSize) {
      getSize(imgSize, type)
    }
  }, [imgSize]);

  /**
   * blob做預覽好像有CSP問題，還沒找到方式解決，預覽先轉base64
   * CSP在主機設定，其實blob做愈覽圖沒問題，先改回blob
   * @param {*} _file 
   * @returns 
   */
  // const toBase64 = (_file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const previewData = reader.result;
  //       resolve(previewData);
  //     }

  //     reader.readAsDataURL(_file);
  //   });
  // }

  const fileHandler = async (e) => {
    let file = e.target.files[0];

    // let previewData = await toBase64(file);

    setPropsObj((prevData) => ({
      ...prevData,
      files: file,
      imagePreviewUrl: URL.createObjectURL(file),
    }));

    onChangeEvent(e)
  }

  const handlePreview = () => {
    if (propsObj && propsObj.imagePreviewUrl) {
      window.open(propsObj.imagePreviewUrl, '_blank');
    } else {
      alert('No image to preview.');
    }
  };

  return (
    <React.Fragment>
      <input type="file" id={id} accept={accept} style={{ display: 'none' }}
        onChange={e => {
          let inputs = document.querySelector(".upload_file_input");
          let span = document.querySelector("[data-js-label][data-id=" + id + "]");
          if (!e.target.value) return;
          let value = e.target.value.replace(/^.*[\\\/]/, "");
          inputs.className += " -chosen";
          span.innerText = value;
          fileHandler(e);
        }} />
      <Box
        className="upload_file_input ellipsis-normal"
        data-id={id}
        style={{
          width: "100%",
          borderRadius: "10px",
          border: "1px dashed rgba(0,0,0,0.12)",
          backgroundColor: "#FFFFFF",
          padding: "20px",
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() => document.getElementById(id).click()}
      >
        {propsObj && propsObj.imagePreviewUrl ? (
          <React.Fragment>
            <Box className='upload_file_preview' sx={SxStyle}>
              <img style={{ objectFit: "contain" }}
                src={propsObj.imagePreviewUrl}
                alt={propsObj.fileName || "Image preview"}
                onLoad={(e) => {
                  setImgSize({
                    height: e.target.naturalHeight,
                    width: e.target.naturalWidth
                  });
                }}
              />
            </Box>
            <Box className="upload_file_overlay" onClick={(e) => e.stopPropagation()}>
              {fileName ?
                <React.Fragment>
                  <CusTextIconButton
                    color={"info"}
                    text={"預覽"}
                    onClick={(e) => handlePreview()}
                  />
                  <CusTextIconButton
                    color={"error"}
                    text={"刪除"}
                    onClick={deleteFunc}
                  />
                </React.Fragment>
                :
                uploadFunc ?
                  <CusTextIconButton
                    color={"success"}
                    text={"上傳"}
                    onClick={uploadFunc}
                  />
                  : null
              }
            </Box>
          </React.Fragment>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '170px' }}>
            <CloudUpload fontSize='large' />
            <span>點擊選擇檔案</span>
          </Box>
        )}
        <Grid item xs={12} sx={{ margin: "1rem 0" }}>
          {description}
        </Grid>
        <span className="label" data-id={id} data-js-label>
          {propsObj && propsObj.fileName ? propsObj.fileName : "尚未選擇檔案"}
        </span>
      </Box>
    </React.Fragment >
  );
};


// 圖片預覽(無上傳功能, 只有預覽、編輯、刪除)
const CusImgFilePreview = (props) => {
  let { key, src, editFunc, deleteFunc } = props

  const handlePreview = () => {
    if (src) {
      window.open(src, '_blank');
    } else {
      alert('No image to preview.');
    }
  };

  const IconButtonSX = {
    margin: "0 5px",
    backgroundColor: "rgba(255,255,255,0.8)",
    '&:hover': {
      backgroundColor: "rgba(255,255,255,1)",
    }
  };

  return (
    <React.Fragment>
      <Box key={key} sx={{ marginRight: "10px" }}>
        <a href={"#"} style={{ position: "relative", display: "inline-block" }}>
          <img
            src={src}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
              border: "1px dashed rgba(0,0,0,0.12)",
              borderRadius: "10px"
            }}
          />
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200px",
              height: "200px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)", // 半透明背景
              color: "white",
              opacity: 0, // 初始透明
              transition: "opacity 0.3s", // 過渡效果
              '&:hover': {
                opacity: 1, // 懸停時顯示
              }
            }}
          >
            <IconButton color={"info"} sx={IconButtonSX} onClick={editFunc}>
              <Edit />
            </IconButton>
            <IconButton color={"info"} sx={IconButtonSX} onClick={(e) => handlePreview()}>
              <Visibility />
            </IconButton>
            <IconButton color={"error"} sx={IconButtonSX} onClick={deleteFunc}>
              <Delete />
            </IconButton>
          </Box>
        </a>
      </Box>
    </React.Fragment >
  );
};

export { CusUploadImgFilePreview, CusUploadImgFile, CusImgFilePreview };