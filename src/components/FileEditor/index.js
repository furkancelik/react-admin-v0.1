import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FILE_UPLOAD, FETCH_GET, FETCH_POST, PUBLIC_DIR } from "../../config";
import "./style.css";
export default class ImageUpload extends Component {
  state = {
    file: null,
    fileUpload: false,
    dir: "./public/uploads",
    isEdit: false,
    files: null,
    path: [],
    newFolder: false,
    folder: ""
  };

  componentDidMount() {
    this.fetchAll();
  }

  async uploadFile(files) {
    this.setState({ fileUpload: true });
    const formData = new FormData();
    const query = `mutation($dir:String){fileUpload(dir:$dir){title,path,type}}`;
    const variables = JSON.stringify({ dir: this.state.dir });

    formData.append("query", query);
    formData.append("variables", variables);
    [...files].map(file => {
      formData.append("files", file);
    });

    try {
      const result = await FILE_UPLOAD(formData);
      this.setState(
        {
          fileUpload: false
          // files: [result.data.data.fileUpload, ...this.state.files]
        },
        () => {
          this.fetchAll();
        }
      );
    } catch (e) {
      this.setState({ fileUpload: false });
    }
  }

  async removeFile() {
    const query = `mutation($files:[String]){removeFiles(files:$files)}`;
    const variables = JSON.stringify({ files: this.state.path });
    try {
      const result = await FETCH_POST({ query, variables });

      if (result.data.data.removeFiles) {
        this.setState(
          {
            files: this.state.files.filter(
              file => !(this.state.path.indexOf(file.path) >= 0)
            ),
            path: []
          },
          () => {
            this.fetchAll();
          }
        );
      }
    } catch (e) {}
  }

  async fetchAll(path = this.state.dir) {
    this.setState({ files: null, path: [] });
    const query = `query={
      allFiles(dir:"${path}") {
        title
        path
        type
      }}`;
    try {
      const result = await FETCH_GET(query);
      this.setState({ files: result.data.data.allFiles, dir: path });
    } catch (e) {
      alert(`Beklenmedik bir hata meydana geldi: ${e.toString()}`);
      // TODO: flash mesaj döndür modali kapat
    }
  }

  handleChange = e => {
    if (e.target.checked) {
      this.setState({
        path: [...this.state.path, e.target.value]
      });
    } else {
      this.setState({
        path: this.state.path.filter(item => item !== e.target.value)
      });
    }
    // this.setState({
    //   path: e.target.checked
    // });
    // this.setState({
    //   [e.target.name]:
    //     e.target.type === "checkbox" ? e.target.checked : e.target.value
    // });
  };

  async newFolder() {
    const query = `mutation($folder:String,$dir:String){newFolder(folder:$folder,dir:$dir)}`;
    const variables = JSON.stringify({
      dir: this.state.dir,
      folder: this.state.folder
    });
    try {
      const result = await FETCH_POST({ query, variables });
      if (result.data.data.newFolder) {
        this.setState({
          files: [
            {
              title: this.state.folder,
              type: "directory",
              path: `${this.state.dir}/${this.state.folder}`
            },
            ...this.state.files
          ],
          newFolder: false
        });
      }
    } catch (e) {}
  }

  renderFilePreview(path) {
    const extAar = path.split(".");
    const ext = extAar[extAar.length - 1];

    if (ext === "png" || ext === "jpg") {
      return (
        <div>
          <img
            src={PUBLIC_DIR(path)}
            onDoubleClick={() => {
              this.closeModal.click();
              this.props.onChange(path);
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <FontAwesomeIcon icon={["fas", "file"]} size={"4x"} color={"#999"} />
        </div>
      );
    }
  }

  renderModalContent() {
    if (!this.state.files) {
      return "Yükleniyor";
    }
    if (this.state.files.length === 0) {
      return (
        <div style={{ margin: 50 }}>
          <h5 style={{ textAlign: "center" }}>Dizin içerisi boş</h5>
        </div>
      );
    }
    return (
      <ul className={"image-editor-tree"}>
        {this.state.files.map(file => (
          <li>
            {file.type === "directory" ? (
              <div
                onDoubleClick={() => {
                  this.fetchAll(file.path);
                }}>
                <FontAwesomeIcon
                  icon={["fas", "folder"]}
                  size={"4x"}
                  color={"#3c8dbc"}
                />
              </div>
            ) : (
              this.renderFilePreview(file.path)
            )}
            <div>
              <label style={{ fontWeigth: "100" }}>
                <input
                  onChange={this.handleChange}
                  type="checkbox"
                  name={"path[]"}
                  value={file.path}
                />{" "}
                {file.title}
              </label>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  renderModal() {
    return (
      <div
        className={`modal fade bd-example-modal-lg modal_id_${this.props.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
        <div className={"modal-dialog modal-lg"} role="document">
          <div className={"modal-content"}>
            <div className={"modal-header"}>
              <h5 className={"modal-title"} id="exampleModalLabel">
                Resim Yönetimi
              </h5>
              <button
                ref={c => {
                  this.closeModal = c;
                }}
                type="button"
                className={"close"}
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className={"modal-body"}>
              <ul className={"image-editor-tollbar"}>
                <li>
                  <button
                    disabled={this.state.dir === "./public/uploads"}
                    type="button"
                    className={"btn btn-default"}
                    onClick={() => {
                      if (this.state.dir !== "./public/uploads") {
                        const dirs = this.state.dir.split("/");
                        dirs.splice(dirs.length - 1, 1);
                        this.fetchAll(dirs.join("/"));
                      }
                    }}>
                    <FontAwesomeIcon icon={["fas", "level-up-alt"]} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={"btn btn-default"}
                    onClick={() => {
                      this.fetchAll();
                    }}>
                    <FontAwesomeIcon icon={["fas", "sync-alt"]} />
                  </button>
                </li>
                <li>
                  {!this.state.fileUpload ? (
                    <button
                      type="button"
                      className={"btn btn-default"}
                      onClick={() => {
                        this.fileInput.click();
                      }}>
                      <FontAwesomeIcon icon={["fas", "upload"]} />
                    </button>
                  ) : (
                    <button type="button" className={"btn btn-default"}>
                      <FontAwesomeIcon icon="spinner" spin />
                    </button>
                  )}

                  <input
                    multiple={true}
                    type="file"
                    name={"file"}
                    ref={c => {
                      this.fileInput = c;
                    }}
                    onChange={e => {
                      this.uploadFile(e.target.files);
                    }}
                    style={{ display: "none" }}
                  />
                </li>
                <li>
                  <button
                    type="button"
                    className={"btn btn-default"}
                    onClick={() => {
                      this.setState(
                        { newFolder: !this.state.newFolder },
                        () => {
                          if (this.folder) this.folder.focus();
                        }
                      );
                    }}>
                    <FontAwesomeIcon icon={["fas", "folder"]} />
                  </button>
                </li>
                <li>
                  <button
                    disabled={this.state.path.length === 0}
                    type="button"
                    className={"btn btn-default"}
                    onClick={() => {
                      if (this.state.path.length > 0) {
                        if (
                          window.confirm(
                            "Silmek istediğinize eminmisniz? Bu İşlem Geri Alınamaz!"
                          )
                        )
                          this.removeFile();
                      }
                    }}>
                    <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                  </button>
                </li>
                {this.state.newFolder && (
                  <li
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "flex-end",
                      justifyConten: "flex-end"
                    }}>
                    <input
                      ref={c => {
                        this.folder = c;
                      }}
                      className={"form-control"}
                      name={"folder"}
                      type="text"
                      placeholder="Klasör Adı Giriniz"
                      onChange={e => {
                        this.setState({ folder: e.target.value });
                      }}
                    />
                    <button
                      type="button"
                      className={"btn btn-default"}
                      style={{ marginLeft: 5 }}
                      onClick={() => {
                        this.setState({ newFolder: false });
                      }}>
                      <FontAwesomeIcon icon={["fas", "times"]} />
                    </button>
                    <button
                      type="button"
                      className={"btn btn-default"}
                      style={{ marginLeft: 5 }}
                      onClick={() => {
                        this.newFolder();
                      }}>
                      <FontAwesomeIcon icon={["fas", "plus"]} />
                    </button>
                  </li>
                )}
              </ul>
              <hr />
              {this.renderModalContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          <img
            src={
              this.props.defaultValue == ""
                ? "/static/admin/images/no-image.png"
                : PUBLIC_DIR(this.props.defaultValue)
            }
            className={"img-thumbnail"}
            style={{ width: 150 }}
            onClick={e => {
              this.setState({ isEdit: !this.state.isEdit });
            }}
            // data-toggle="modal"
            // data-target=".bd-example-modal-lg"
          />
          {this.state.isEdit && (
            <div className={"arrow_box"}>
              <button
                type="button"
                className={"btn btn-primary"}
                style={{ marginRight: 5 }}
                data-toggle="modal"
                data-target={`.modal_id_${this.props.id}`}
                onClick={e => {
                  this.setState({ isEdit: false });
                }}>
                <FontAwesomeIcon icon={["fas", "pencil-alt"]} />
              </button>
              <button
                type="button"
                className={"btn btn-danger"}
                onClick={() => {
                  this.setState({ isEdit: false });
                  this.props.onChange("");
                }}>
                <FontAwesomeIcon icon={["fas", "trash-alt"]} />
              </button>
            </div>
          )}
        </div>

        {this.renderModal()}
      </div>
    );
  }
}
