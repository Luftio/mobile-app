export const mapping = {
  components: {
    Button: {
      mapping: {
        textFontFamily: "Montserrat_700Bold",
      },
      meta: {},
      appearances: {
        default: {
          mapping: {
            textFontFamily: "Montserrat_700Bold",
          },
        },
        outline: {
          mapping: {},
          variantGroups: {
            status: {
              primary: {
                textFontFamily: "Montserrat_700Bold",
                backgroundColor: "white",
                textColor: "#838C97",
                borderColor: "#E1E6EA",
                state: {
                  active: {
                    backgroundColor: "#FAFAFA",
                    borderColor: "#E1E6EA",
                    textColor: "#AFB8BF",
                  },
                },
              },
              basic: {
                textFontFamily: "Montserrat_700Bold",
                backgroundColor: "#fff",
                textColor: "#838C97",
                borderColor: "transparent",
                state: {
                  active: {
                    backgroundColor: "#FBFBFB",
                    textColor: "#838C97",
                    borderColor: "transparent",
                  },
                },
              },
            },
          },
        },
        filled: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                textFontFamily: "Montserrat_700Bold",
                backgroundColor: "#fff",
                textColor: "#031846",
                borderColor: "transparent",
                state: {
                  active: {
                    backgroundColor: "#fff",
                    textColor: "#031846",
                    borderColor: "transparent",
                  },
                },
              },
            },
          },
        },
      },
    },
    Text: {
      meta: {},
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            category: {
              h1: {
                color: "#000",
              },
              h2: {
                color: "#000",
              },
              h3: {
                color: "#000",
              },
              h4: {
                color: "#000",
              },
              s2: {
                color: "#838C97",
              },
              p1: {
                color: "#000",
              },
              label: {
                color: "#AFB8BF",
              },
              c1: {
                color: "#AFB8BF",
              },
            },
          },
        },
      },
    },
    Input: {
      meta: {},
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                backgroundColor: "#FFF",
                borderColor: "#E1E6EA",
              },
            },
          },
        },
      },
    },
    Select: {
      meta: {},
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                backgroundColor: "#FFF",
                borderColor: "#E1E6EA",
              },
              control: {
                backgroundColor: "transparent",
                borderColor: "transparent",
                state: {
                  active: {
                    backgroundColor: "#E1E6EA",
                    borderColor: "transparent",
                  },
                },
              },
            },
          },
        },
      },
    },
    CheckBox: {
      meta: {},
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                backgroundColor: "#FFF",
                borderColor: "#E1E6EA",
              },
            },
          },
        },
      },
    },
    Radio: {
      meta: {},
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                backgroundColor: "#FFF",
                borderColor: "#E1E6EA",
              },
            },
          },
        },
      },
    },
  },
  strict: {
    "text-font-family": "Montserrat_400Regular",
    "header-font-family": "Montserrat_600SemiBold",
    "text-heading-1-font-size": 22,
    "text-heading-1-font-weight": "600",
    "text-heading-1-font-family": "Montserrat_600SemiBold",
    "text-heading-2-font-family": "Montserrat_600SemiBold",
    "text-heading-3-font-size": 18,
    "text-heading-3-font-weight": "500",
    "text-heading-3-font-family": "Montserrat_600SemiBold",
    "text-heading-4-font-size": 18,
    "text-heading-4-font-weight": "500",
    "text-heading-4-font-family": "Montserrat_600SemiBold",
    "text-subtitle-2-font-size": 18,
    "text-subtitle-2-font-weight": "400",
    "text-subtitle-2-font-family": "Montserrat_400Regular",
    "text-paragraph-1-font-size": 16,
    "text-caption-1-font-size": 14,
    "text-caption-1-font-weight": "500",
    "text-caption-1-font-family": "Montserrat_500Medium",
    "text-caption-2-font-size": 14,
    "text-caption-2-font-weight": "400",
    "text-caption-2-font-family": "Montserrat_400Regular",
    "text-label-font-size": 14,
    "text-label-font-weight": "700",
    "text-label-font-family": "Montserrat_700Bold",
  },
};
