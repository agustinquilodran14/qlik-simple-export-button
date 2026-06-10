define(["qlik"], function (qlik) {
    return {
        definition: {
            type: "items",
            component: "accordion",
            items: {
                settings: {
                    uses: "settings",
                    items: {
                        configuracionBoton: {
                            type: "items",
                            label: "Configuración del Botón",
                            items: {
                                tableId: {
                                    ref: "tableId",
                                    label: "ID del Objeto/Tabla a Exportar",
                                    type: "string",
                                    expression: "optional"
                                },
                                exportType: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Formato de Exportación",
                                    ref: "exportType",
                                    options: [
                                        { value: "OOXML", label: "Excel (.xlsx)" },
                                        { value: "CSV_C", label: "CSV" }
                                    ],
                                    defaultValue: "OOXML"
                                },
                                buttonText: {
                                    ref: "buttonText",
                                    label: "Texto del Botón",
                                    type: "string",
                                    defaultValue: "Descargar a Excel 📥"
                                },
                                fileName: {
                                    ref: "fileName",
                                    label: "Nombre del archivo (sin extensión)",
                                    type: "string",
                                    expression: "optional",
                                    defaultValue: "Mi_Reporte"
                                },
                                buttonColor: {
                                    ref: "buttonColor",
                                    label: "Color del Botón (Hexadecimal)",
                                    type: "string",
                                    expression: "optional",
                                    defaultValue: "#4F2D7F" // Morado corporativo de Grant Thornton por defecto
                                }
                            }
                        }
                    }
                }
            }
        },
        paint: function ($element, layout) {
            var app = qlik.currApp(this);
            
            $element.empty();

            var btn = document.createElement('button');
            btn.innerHTML = layout.buttonText || 'Descargar a Excel 📥';
            
            btn.className = 'qui-button';
            btn.style.width = '100%';
            btn.style.height = '100%';
            btn.style.cursor = 'pointer';
            btn.style.backgroundColor = layout.buttonColor || '#4F2D7F';
            btn.style.color = '#ffffff';
            btn.style.border = 'none';
            btn.style.borderRadius = '3px';
            btn.style.fontWeight = 'bold';
            
            btn.onclick = function() {
                var targetId = layout.tableId;
                var expType = layout.exportType || 'OOXML';
                var fName = layout.fileName || 'Reporte_Qlik'; 
                
                if(!targetId) {
                    alert("Falta configurar el ID de la tabla en las propiedades.");
                    return;
                }
                
                var textoOriginal = btn.innerHTML;
                btn.innerHTML = 'Generando archivo...';
                btn.disabled = true;

                app.model.engineApp.getObject(targetId).then(function(model) {
                    // Pedimos el archivo a Qlik
                    return model.exportData(expType, '/qHyperCubeDef', fName, 'P');
                }).then(function(reply) {
                    
                    var baseUrl = window.location.protocol + "//" + window.location.host;
                    var downloadUrl = reply.qUrl;
                    
                    if (downloadUrl.indexOf('http') !== 0) {
                        downloadUrl = baseUrl + (downloadUrl.startsWith('/') ? '' : '/') + downloadUrl;
                    }
                    
                    // SOLUCIÓN: Usamos "fetch" para descargar los datos en crudo (Blob) 
                    // y sobreescribir las reglas de nombre del servidor de Qlik.
                    fetch(downloadUrl)
                        .then(res => res.blob())
                        .then(blob => {
                            var url = window.URL.createObjectURL(blob);
                            var link = document.createElement("a");
                            link.href = url;
                            
                            // Le asignamos el nombre exacto que escribiste + la extensión correcta
                            var extension = (expType === 'CSV_C') ? '.csv' : '.xlsx';
                            link.download = fName + extension;
                            
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                            
                            // Restauramos el botón
                            btn.innerHTML = textoOriginal;
                            btn.disabled = false;
                        })
                        .catch(err => {
                            console.error("Error al forzar la descarga:", err);
                            btn.innerHTML = textoOriginal;
                            btn.disabled = false;
                        });
                    
                }).catch(function(err) {
                    console.error("Error en la exportación:", err);
                    alert("No se pudo exportar la tabla.");
                    btn.innerHTML = textoOriginal;
                    btn.disabled = false;
                });
            };
            
            $element.append(btn);
            return qlik.Promise.resolve();
        }
    };
});

