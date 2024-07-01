import Variables from "../src/scss/App.css";
console.log(Variables, "Variables");

sessionStorage.setItem("themeStatus", "LightON")
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

/**
 * 切換主題
 * @param {string} status ["LightON", "LightOFF", "ECC","Utility"]
 * @description [Primary,Secondary,Error,Warning,Info,Success]，這些Default values一定要有[light,main,dark]
 * @param {object} Variables 裡面包含 "_variables.scss" 的參數
 * @param {object} Utility 開頭為通用參數，其餘為主題專用參數
 */
export const Theme = (() => {
  const labelFontSize = "1.3rem";

  /**
   * defaultTheme
   */
  const defaultTheme = {
    palette: {
      default: {
        light: Variables[status + "__DefaultLight"],
        main: Variables[status + "__Default"],
        dark: Variables[status + "__DefaultDark"],
        contrastText: Variables[status + "__DefaultContrastText"],
      },
      primary: {
        light: Variables[status + "__PrimaryLight"],
        main: Variables[status + "__Primary"],
        dark: Variables[status + "__PrimaryDark"],
        contrastText: Variables[status + "__PrimaryContrastText"],
      },
      secondary: {
        light: Variables[status + "__SecondaryLight"],
        main: Variables[status + "__Secondary"],
        dark: Variables[status + "__SecondaryDark"],
        contrastText: Variables[status + "__SecondaryContrastText"],
      },
      success: {
        light: Variables[status + "__BtnSuccessLight"],
        main: Variables[status + "__BtnSuccess"],
        dark: Variables[status + "__BtnSuccessDark"],
        contrastText: Variables[status + "__BtnSuccessContrastText"],
      },
      info: {
        light: Variables[status + "__BtnInfoLight"],
        main: Variables[status + "__BtnInfo"],
        dark: Variables[status + "__BtnInfoDark"],
        contrastText: Variables[status + "__BtnInfoContrastText"],
      },
      warning: {
        light: Variables[status + "__BtnWarningLight"],
        main: Variables[status + "__BtnWarning"],
        dark: Variables[status + "__BtnWarningDark"],
        contrastText: Variables[status + "__BtnWarningContrastText"],
      },
      error: {
        light: Variables[status + "__BtnErrorLight"],
        main: Variables[status + "__BtnError"],
        dark: Variables[status + "__BtnErrorDark"],
        contrastText: Variables[status + "__BtnErrorContrastText"],
      },
      soft: {
        light: Variables[status + "__BoxShadowLight"],
        dark: Variables[status + "__BoxShadowDark"],
        lightHover: Variables[status + "__boxShadowHoverLight"],
        darkHover: Variables[status + "__boxShadowHoverDark"],
      }
    },
    shape: {
      borderRadius: parseInt(Variables[status + "__borderRadius"]),
      UtilityBorderRadius: parseInt(Variables["Utility__borderRadius"]),
    },
    footer: {
      backgroundColor: Variables[status + "__FooterBackgroundColor"],
      height: parseInt(Variables[status + "__FooterHeight"]),
    },
    navBar: {
      height: parseInt(Variables["Utility__LogoHeight"]),
    },
    sidebar: {
      textColor: Variables[status + "__SidebarTextColor"]
    },
    dialog: {
      textColor: Variables[status + "__DialogWarningText"]
    },
    outlet: {
      backgroundColor: Variables[status + "__MainOutletBackgroundColor"],
      secBackgroundColor: Variables[status + "__MainSecOutletBackgroundColor"],
    },
    components: {
      // Progress
      MuiLinearProgress: {
        styleOverrides: {
          root: {
          }
        }
      },
      // ButtonBase
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果 
        },
        styleOverrides: {
          root: {
            [`&.active, :active`]: {
              transition: "transform .1s ease",
              transform: "scale(.95)",
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
          }
        }
      },
      // Button
      MuiButton: {
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          root: {
            borderRadius: "10px",
            boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
            transition: "all .5s ease",
            // button contained
            [`&.MuiButton-contained`]: {
              // Default
              [`&.MuiButton-containedDefault`]: {
                color: Variables[status + "__DefaultContrastText"],
                background: `linear-gradient(145deg, ${Variables[status + "__Default"]}, ${Variables[status + "__Default"]})`,
                [`&:hover`]: {
                  background: `linear-gradient(145deg, ${Variables[status + "__BoxShadowHoverLight"]}, ${Variables[status + "__BoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowHoverLight"]}`
                },
              },
              // Primary
              [`&.MuiButton-containedPrimary`]: {
                color: Variables[status + "__PrimaryContrastText"],
                background: `linear-gradient(145deg, ${Variables[status + "__Primary"]}, ${Variables[status + "__Primary"]})`,
                [`&:hover`]: {
                  background: `linear-gradient(145deg, ${Variables[status + "__PrimaryBoxShadowHoverLight"]}, ${Variables[status + "__PrimaryBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__PrimaryBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__PrimaryBoxShadowHoverLight"]}`
                },
              },
              // Secondary
              [`&.MuiButton-containedSecondary`]: {
                color: Variables[status + "__SecondaryContrastText"],
                background: `linear-gradient(145deg, ${Variables[status + "__Secondary"]}, ${Variables[status + "__Secondary"]})`,
                [`&:hover`]: {
                  background: `linear-gradient(145deg, ${Variables[status + "__SecondaryBoxShadowHoverLight"]}, ${Variables[status + "__SecondaryBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__SecondaryBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__SecondaryBoxShadowHoverLight"]}`
                },
              },
              // Success
              [`&.MuiButton-containedSuccess`]: {
                color: Variables[status + "__SuccessContrastText"],
                background: `linear-gradient(145deg, ${Variables[status + "__BtnSuccess"]}, ${Variables[status + "__BtnSuccess"]})`,
                [`&:hover`]: {
                  background: `linear-gradient(145deg, ${Variables[status + "__SuccessBoxShadowHoverLight"]}, ${Variables[status + "__SuccessBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__SuccessBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__SuccessBoxShadowHoverLight"]}`
                },
              },
              // Info
              [`&.MuiButton-containedInfo`]: {
                color: Variables[status + "__InfoContrastText"],
                background: `linear-gradient(145deg, ${Variables[status + "__BtnInfo"]}, ${Variables[status + "__BtnInfo"]})`,
                [`&:hover`]: {
                  background: `linear-gradient(145deg, ${Variables[status + "__InfoBoxShadowHoverLight"]}, ${Variables[status + "__InfoBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__InfoBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__InfoBoxShadowHoverLight"]}`
                },
              },
              // Warning
              [`&.MuiButton-containedWarning`]: {
                color: Variables[status + "__WarningContrastText"],
                background: `linear-gradient(145deg, ${Variables[status + "__BtnWarning"]}, ${Variables[status + "__BtnWarning"]})`,
                [`&:hover`]: {
                  background: `linear-gradient(145deg, ${Variables[status + "__WarningBoxShadowHoverLight"]}, ${Variables[status + "__WarningBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__WarningBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__WarningBoxShadowHoverLight"]}`
                },
              },
              // Error
              [`&.MuiButton-containedError`]: {
                color: Variables[status + "__ErrorContrastText"],
                background: `linear-gradient(145deg, ${Variables[status + "__BtnError"]}, ${Variables[status + "__BtnError"]})`,
                [`&:hover`]: {
                  background: `linear-gradient(145deg, ${Variables[status + "__ErrorBoxShadowHoverLight"]}, ${Variables[status + "__ErrorBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__ErrorBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__ErrorBoxShadowHoverLight"]}`
                },
              },
              // button disabled
              [`&:disabled`]: {
                color: "#F1F2F6",
                background: "none",
                backgroundColor: "#D4D5D8",
                boxShadow: "none"
              },
            },
            // button outlined
            [`&.MuiButton-outlined`]: {
              // Primary
              [`&.MuiButton-outlinedPrimary`]: {
                color: Variables[status + "__DefaultDark"],
                border: `2px solid ${Variables[status + "__DefaultDark"]}`,
                backgroundColor: Variables[status + "__Default"],
                [`&:hover`]: {
                  color: Variables[status + "__PrimaryContrastText"],
                  background: `linear-gradient(145deg, ${Variables[status + "__PrimaryBoxShadowHoverLight"]}, ${Variables[status + "__PrimaryBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__PrimaryBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__PrimaryBoxShadowHoverLight"]}`
                },
              },
              // Secondary
              [`&.MuiButton-outlinedSecondary`]: {
                color: Variables[status + "__Secondary"],
                border: `2px solid ${Variables[status + "__Secondary"]}`,
                backgroundColor: Variables[status + "__Default"],
                [`&:hover`]: {
                  color: Variables[status + "__SecondaryContrastText"],
                  background: `linear-gradient(145deg, ${Variables[status + "__SecondaryBoxShadowHoverLight"]}, ${Variables[status + "__SecondaryBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__SecondaryBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__SecondaryBoxShadowHoverLight"]}`
                },
              },
              // Success
              [`&.MuiButton-outlinedSuccess`]: {
                color: Variables[status + "__BtnSuccess"],
                border: `2px solid ${Variables[status + "__BtnSuccess"]}`,
                backgroundColor: Variables[status + "__Default"],
                [`&:hover`]: {
                  color: Variables[status + "__BtnSuccessContrastText"],
                  background: `linear-gradient(145deg, ${Variables[status + "__SuccessBoxShadowHoverLight"]}, ${Variables[status + "__SuccessBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__SuccessBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__SuccessBoxShadowHoverLight"]}`
                },
              },
              // Info
              [`&.MuiButton-outlinedInfo`]: {
                color: Variables[status + "__BtnInfo"],
                border: `2px solid ${Variables[status + "__BtnInfo"]}`,
                backgroundColor: Variables[status + "__Default"],
                [`&:hover`]: {
                  color: Variables[status + "__BtnInfoContrastText"],
                  background: `linear-gradient(145deg, ${Variables[status + "__InfoBoxShadowHoverLight"]}, ${Variables[status + "__InfoBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__InfoBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__InfoBoxShadowHoverLight"]}`
                },
              },
              // Warning
              [`&.MuiButton-outlinedWarning`]: {
                color: Variables[status + "__BtnWarning"],
                border: `2px solid ${Variables[status + "__BtnWarning"]}`,
                backgroundColor: Variables[status + "__Default"],
                [`&:hover`]: {
                  color: Variables[status + "__BtnWarningContrastText"],
                  background: `linear-gradient(145deg, ${Variables[status + "__WarningBoxShadowHoverLight"]}, ${Variables[status + "__WarningBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__WarningBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__WarningBoxShadowHoverLight"]}`
                },
              },
              // Error
              [`&.MuiButton-outlinedError`]: {
                color: Variables[status + "__BtnError"],
                border: `2px solid ${Variables[status + "__BtnError"]}`,
                backgroundColor: Variables[status + "__Default"],
                [`&:hover`]: {
                  color: Variables[status + "__BtnErrorContrastText"],
                  background: `linear-gradient(145deg, ${Variables[status + "__ErrorBoxShadowHoverLight"]}, ${Variables[status + "__ErrorBoxShadowHoverDark"]})`,
                  boxShadow: `6px 6px 12px ${Variables[status + "__BoxShadowDark"]}, -6px -6px 12px ${Variables[status + "__BoxShadowLight"]}`,
                },
                [`&.active, :active`]: {
                  transition: "transform .1s ease",
                  transform: "scale(.95)",
                  fontWeight: "bold",
                  boxShadow: `inset 3px 3px 6px ${Variables[status + "__ErrorBoxShadowHoverDark"]}, inset -3px -3px 6px ${Variables[status + "__ErrorBoxShadowHoverLight"]}`
                },
              },
              // button disabled
              [`&:disabled`]: {
                color: "#D4D5D8",
                border: "2px solid #D4D5D8",
                backgroundColor: Variables[status + "__Default"],
                boxShadow: "none"
              },
            },
            // Pagination btn
            [`&.Pagination__btn`]: {
              boxShadow: "none",
              transition: "all .5s ease",
              [`&:hover`]: {
                boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
              },
              [`&.active, :active`]: {
                boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
              }
            },
            // navBar btn
            [`&.MuiButton-text`]: {
              color: Variables[status + "__DefaultDark"],
              [`&Primary`]: {
                [`&.WebHeader__button`]: {
                  [`&:hover`]: {
                    transition: "all .5s ease"
                  },
                  [`&.active, :active`]: {
                    transition: "transform .1s ease",
                    transform: "scale(.95)",
                    [`span`]: {
                      marginTop: "1px",
                      color: Variables[status + "__Secondary"]
                    },
                    fontWeight: "bold",
                    boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
                  },
                }
              }
            },
          }
        }
      },
      // IconButton
      MuiIconButton: {
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          root: {
            transition: "box-shadow .3s",
            [`&:hover`]: {
              boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
            },
            [`&.active, :active`]: {
              transition: "transform .1s ease",
              transform: "scale(.95)",
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.MuiIconButton-colorPrimary`]: {
              color: Variables[status + "__DefaultDark"],
            },
            [`&.MuiIconButton-colorSecondary`]: {
              color: Variables[status + "__BtnSecondary"]
            },
            [`&.MuiIconButton-colorSuccess`]: {
              color: Variables[status + "__BtnSuccess"]
            },
            [`&.MuiIconButton-colorInfo`]: {
              color: Variables[status + "__BtnInfo"]
            },
            [`&.MuiIconButton-colorWarning`]: {
              color: Variables[status + "__BtnWarning"]
            },
            [`&.MuiIconButton-colorError`]: {
              color: Variables[status + "__BtnError"]
            },
            [`&.Mui-disabled`]: {
              color: "#D4D5D8",
            },
          }
        }
      },
      // MuiButtonGroup
      MuiButtonGroup: {
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          root: {
            borderRadius: "10px",
          }
        }
      },
      // Toggle Button
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
          }
        }
      },
      MuiToggleButton: {
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          root: {
            border: "none",
            [`&:hover`]: {
              borderRadius: "10px",
              background: `linear-gradient(145deg, ${Variables[status + "__BoxShadowHoverLight"]}, ${Variables[status + "__BoxShadowHoverDark"]})`,
            },
            [`&.active, :active`]: {
              transition: "transform .1s",
              transform: "scale(.95)",
              borderRadius: "10px",
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.Mui-selected`]: {
              borderRadius: "10px",
              color: Variables[status + "__Secondary"],
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
          }
        }
      },
      // ListItemButton
      MuiListItemButton: {
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          root: {
            [`&:hover`]: {
              transition: "box-shadow .5s",
              borderRadius: "50px",
              backgroundColor: Variables[status + "__Default"],
              boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
            },
            [`&.active, :active`]: {
              transition: "transform .1s",
              transform: "scale(.95)",
              backgroundColor: Variables[status + "__Default"],
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.Mui-selected`]: {
              [`&:focus`]: {
                background: "none"
              },
              color: Variables[status + "__Secondary"],
              backgroundColor: Variables[status + "__Default"],
              borderRadius: "50px",
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
              [`&:hover`]: {
                backgroundColor: Variables[status + "__Default"],
              }
            },
          }
        }
      },
      // MuiSwitch
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: "40px",
            height: "24px",
            padding: "0",
            margin: "4px",
            [`& .MuiSwitch-switchBase`]: {
              padding: "0",
              margin: "2px",
              transitionDuration: "300ms",
              [`&.Mui-checked`]: {
                transform: "translateX(16px)",
                color: "#fff",
                [`& + .MuiSwitch-track`]: {
                  opacity: "1",
                  border: "0",
                },
                [`&.Mui-disabled + .MuiSwitch-track`]: {
                  opacity: "0.5",
                },
              },
              [`&.Mui-focusVisible .MuiSwitch-thumb`]: {
                color: "#33cf4d",
                border: "6px solid #fff",
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: "0.7",
              },
            },
            [`& .MuiSwitch-thumb`]: {
              boxSizing: "border-box",
              width: "20px",
              height: "20px",
              background: `linear-gradient(145deg, ${Variables[status + "__BoxShadowHoverLight"]}, ${Variables[status + "__BoxShadowHoverDark"]})`,
            },
            [`& .MuiSwitch-track`]: {
              borderRadius: "15px",
              backgroundColor: "#D4D5D8",
              opacity: "1",
            },
          }
        }
      },
      // Checkbox
      MuiCheckbox: {
        styleOverrides: {
          root: {
            [`&.MuiCheckbox-colorPrimary`]: {
              [`&.Mui-checked`]: {
                color: Variables[status + "__DefaultDark"],
              }
            }
          }
        }
      },
      // Tab 
      MuiTab: {
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          root: {
            [`&.MuiTab-root`]: {
              zIndex: "1"
            },
            [`&.Mui-selected`]: {
              color: Variables[status + "__Secondary"],
            },
            [`&.active, :active`]: {
              transition: "transform .3s ease",
              transform: "scale(.9)",
              boxShadow: "none"
            },
          }
        }
      },
      // Tabs 
      MuiTabs: {
        styleOverrides: {
          root: {
            [`& .MuiTabs-root`]: {
              padding: "0"
            },
            [`& .MuiTabs-indicator`]: {
              height: "100%",
              borderRadius: "50px",
              backgroundColor: Variables[status + "__Default"],
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
            },
          }
        }
      },
      // Table
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: Variables[status + "__TableHeadBackgroundColor"],
          }
        }
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            [`&.MuiTableContainer-root`]: {
              border: `1px solid #D9D9DC`,
              backgroundColor: "RGB(236, 236, 240)",
              borderRadius: "10px",
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            // borderBottom: `10px solid ${Variables[status + "__Default"]}`,
            padding: "10px",
            [`&.MuiTableCell-head`]: {
              color: Variables[status + "__TableHeadColor"],
              whiteSpace: "nowrap",
              [`& .MuiCheckbox-root.MuiCheckbox-color`]: {
                [`&Primary`]: {
                  color: "#fff",
                  [`&.Mui-checked`]: {
                    color: "#fff"
                  }
                },
                [`&Secondary`]: {
                  color: "#fff",
                  [`&.Mui-checked`]: {
                    color: "#fff"
                  }
                }
              },
              [`& .MuiCheckbox-root`]: {
                padding: "0px 5px"
              },
            },
            [`& .MuiCheckbox-root`]: {
              padding: "0px 5px"
            },
            [`& .MuiAutocomplete-root`]: {
              margin: "0px",
              [`& .MuiFormControl-root`]: {
                margin: "0px"
              }
            }
          },
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            [`& .MuiToolbar-root .MuiInputBase-colorPrimary`]: {
              margin: "0"
            },
            [`& .MuiTablePagination-displayedRows`]: {
              display: "none"
            }
          }
        }
      },
      // MuiTooltip
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: "3px"
          }
        }
      },
      // Stepper
      MuiStepIcon: {
        styleOverrides: {
          root: {
            [`&.MuiStepIcon-root`]: {
              borderRadius: "20px",
              boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
            },
            [`&.Mui-active`]: {
              borderRadius: "20px",
              boxShadow: `3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`,
            },
            [`&.Mui-completed`]: {
              color: Variables[status + "__Secondary"],
            }
          }
        }
      },
      // Input
      MuiInputBase: {
        styleOverrides: {
          root: {
            [`&.MuiInputBase-root`]: {
              backgroundColor: "#F1F2F6",
              borderRadius: "10px",
              boxShadow: `inset 3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.MuiOutlinedInput-root.Mui-disabled`]: {
              color: "rgba(0, 0, 0, 0.5)",
              boxShadow: "none",
              [`& fieldset`]: {
                border: "1px solid #cdced1"
              }
            },
          },
          input: {
            [`&.MuiOutlinedInput-input.Mui-disabled`]: {
              WebkitTextFillColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            [`& > fieldset > legend`]: {
              fontSize: `calc(0.75 * ${labelFontSize})`
            }
          }
        }
      },
      // Drawer
      MuiDrawer: {
        styleOverrides: {
          root: {
            flexShrink: 0,
            zIndex: { xs: "998" },
            [`&.SystemDrawer`]: {
              width: '200px',
              [`& .MuiDrawer-paper`]: {
                position: 'relative',
                width: '200px',
                borderRadius: "0",
                backgroundColor: Variables[status + "__DrawerBackgroundColor"],
                color: Variables[status + "__DrawerColor"],
                boxSizing: 'border-box',
                border: "none",
              }
            },
            [`&.WebDrawer3`]: {
              [`&.left`]: {
                width: '350px',
                [`& .MuiDrawer-paper`]: {
                  position: 'relative',
                  width: '350px',
                  borderRadius: "0",
                  backgroundColor: "#fff",
                  color: Variables[status + "__DrawerColor"],
                  boxSizing: 'border-box',
                  border: "none",
                }
              },
              [`&.top`]: {
                width: '250px',
                [`& .MuiDrawer-paper`]: {
                  position: 'relative',
                  width: '250px',
                  borderRadius: "0",
                  backgroundColor: "#fff",
                  color: Variables[status + "__DrawerColor"],
                  boxSizing: 'border-box',
                  border: "none",
                }
              },
            },
          }
        }
      },
      // Paper
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "15px",
            backgroundColor: Variables[status + "__Default"]
          }
        }
      },
      // Card
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "15px",
            backgroundColor: Variables[status + "__Default"]
          }
        }
      },
      // List
      MuiList: {
        styleOverrides: {
          root: {
            margin: ".8em 1em",
            padding: 0,
            [`& .MuiListItemButton-root`]: {
              paddingTop: '12px',
              paddingBottom: '12px',
              borderRadius: "15px",
            }
          }
        }
      },
      // Breadcrumbs
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            background: Variables[status + "__BreadcrumbsBackground"],
            height: parseInt(Variables[status + "__BreadcrumbsHeight"]),
          }
        }
      },
      // Divider
      MuiDivider: {
        styleOverrides: {
          root: {
            display: "block",
            width: "100%"
          }
        }
      },
      // FormLabel
      MuiFormLabel: {
        styleOverrides: {
          root: {
            [`&.MuiInputLabel-root span`]: {
              color: "#f44336",
            },
            [`&.MuiInputLabel-root.MuiInputLabel-shrink`]: {
              fontSize: labelFontSize
            },
            [`&.MuiInputLabel-root.Mui-disabled`]: {
              color: "rgba(0, 0, 0, 0.6)",
            },
          }
        }
      },
      // Alert 
      MuiAlert: {
        styleOverrides: {
          root: {
            [`&.MuiAlert-standard`]: {
              [`&Default`]: {
                color: Variables[status + "__DefaultContrastText"],
                backgroundColor: Variables[status + "__DefaultLight"],
                [`& .MuiAlert-icon`]: {
                  color: Variables[status + "__DefaultContrastText"]
                }
              }
            }
          }
        }
      },
      // Chip
      MuiChip: {
        styleOverrides: {
          root: {
            [`&.MuiChip-filled`]: {
              [`&Error`]: {
                color: Variables[status + "__ErrorContrastText"],
                backgroundColor: Variables[status + "__BtnError"]
              },
              [`&Success`]: {
                color: Variables[status + "__BtnSuccessContrastText"],
                backgroundColor: Variables[status + "__BtnSuccess"]
              }
            },
            [`&.MuiChip-outlined`]: {
              [`&Primary`]: {
                backgroundColor: Variables[status + "__PrimaryDarkTransparent"],
              },
              [`&Default`]: {
                backgroundColor: Variables[status + "__DefaultDarkTransparent"],
              },
              [`&Secondary`]: {
                backgroundColor: Variables[status + "__SecondaryDarkTransparent"],
              },
              [`&Warning`]: {
                backgroundColor: Variables[status + "__WarningDarkTransparent"],
              },
              [`&Info`]: {
                backgroundColor: Variables[status + "__infoDarkTransparent"],
              },
              [`&Error`]: {
                color: Variables[status + "__BtnError"],
                border: "1px solid " + Variables[status + "__BtnError"],
                backgroundColor: Variables[status + "__BtnErrorDarkTransparent"],
              },
              [`&Success`]: {
                color: Variables[status + "__BtnSuccess"],
                border: "1px solid " + Variables[status + "__BtnSuccess"],
                backgroundColor: Variables[status + "__BtnSuccessDarkTransparent"],
              }
            },
          }
        }
      },
      // DatePicker
      MuiPickersCalendarHeader: {
        styleOverrides: {
          switchViewButton: {
            [`&:hover`]: {
              boxShadow: "none"
            }
          }
        }
      },
      MuiPickersYear: { // 年份樣式
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          yearButton: {
            [`&:hover`]: {
              transition: "all .3s ease",
              background: "none",
              boxShadow: `3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.active, :active`]: {
              transition: "transform .1s ease",
              transform: "scale(.95)",
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.Mui-selected`]: {
              [`&:focus`]: {
                background: "none"
              },
              [`&:hover`]: {
                background: "none"
              },
              color: Variables[status + "__Primary"],
              backgroundColor: Variables[status + "__Default"],
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
            },
          },
        }
      },
      MuiPickersMonth: { // 月份樣式
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          monthButton: {
            [`&:hover`]: {
              transition: "all .3s ease",
              background: "none",
              boxShadow: `3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.active, :active`]: {
              transition: "transform .1s ease",
              transform: "scale(.95)",
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.Mui-selected`]: {
              [`&:focus`]: {
                background: "none"
              },
              [`&:hover`]: {
                background: "none"
              },
              color: Variables[status + "__Primary"],
              backgroundColor: Variables[status + "__Default"],
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
            },
          },
        }
      },
      MuiPickersDay: { // 日期樣式
        defaultProps: {
          disableRipple: true, // 取消點擊波紋效果
        },
        styleOverrides: {
          root: {
            [`&.MuiPickersDay-today`]: {
              background: "none",
              border: `1px solid ${Variables[status + "__Primary"]}`,
            },
            [`&:hover`]: {
              transition: "all .3s ease",
              background: "none",
              boxShadow: `3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.active, :active`]: {
              transition: "transform .1s ease",
              transform: "scale(.95)",
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 6px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 6px ${Variables[status + "__BoxShadowLight"]}`
            },
            [`&.Mui-selected`]: {
              [`&:focus`]: {
                background: "none"
              },
              [`&:hover`]: {
                background: "none"
              },
              color: Variables[status + "__Primary"],
              backgroundColor: Variables[status + "__Default"],
              fontWeight: "bold",
              boxShadow: `inset 3px 3px 4px ${Variables[status + "__BoxShadowDark"]}, inset -3px -3px 4px ${Variables[status + "__BoxShadowLight"]}`
            },
          }
        }
      },
    }
  }
  console.log(defaultTheme)
  return { defaultTheme }
})();

