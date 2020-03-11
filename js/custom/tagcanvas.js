/ **
 *版权所有（C）2010-2015 Graham Breach
 *
 *此程序是免费软件：您可以重新分发和/或修改
 *它遵循由GNU发布的GNU较小通用公共许可证的条款
 *自由软件基金会，许可证的第3版，或
 *（您可以选择）任何更高版本。
 *
 *分发此程序是希望它会有用，
 *但无任何保证；甚至没有默示担保
 *特定目的的适销性或适用性。看到
 *有关更多详细信息，请参见GNU较宽松通用公共许可证。
 * 
 *您应该已经收到了GNU次通用公共许可证
 *与该程序一起。如果不是，请参见<http://www.gnu.org/licenses/>。
 * /
/ **
 * TagCanvas 2.9
 *有关更多信息，请联系<graham@goat1000.com>
 * /
（功能（）{
“使用严格”；
var i，j，abs = Math.abs，sin = Math.sin，cos = Math.cos，max = Math.max，
  min = Math.min，ceil = Math.ceil，sqrt = Math.sqrt，pow = Math.pow，
  hexlookup3 = {}，hexlookup2 = {}，hexlookup1 = {
  0：“ 0，”，1：“ 17，”，2：“ 34，”，3：“ 51，”，4：“ 68，”，5：“ 85，”，
  6：“ 102”，7：“ 119”，8：“ 136”，9：“ 153”，a：“ 170”，A：“ 170”，
  b：“ 187”，B：“ 187”，c：“ 204”，C：“ 204”，d：“ 221”，D：“ 221”，
  e：“ 238，”，E：“ 238，”，f：“ 255，”，F：“ 255，”  
  }，Oproto，Tproto，TCproto，Mproto，Vproto，TSproto，TCVproto，
  doc =文档，ocanvas，处理程序= {};
for（i = 0; i <256; ++ i）{
  j = i.toString（16）;
  如果（i <16）
    j ='0'+ j;
  hexlookup2 [j] = hexlookup2 [j.toUpperCase（）] = i.toString（）+'，';
}
函数Defined（d）{
  返回typeof d！='undefined';
}
函数IsObject（o）{
  返回typeof o =='object'&& o！= null;
}
函数Clamp（v，mn，mx）{
  返回isNaN（v）？mx：min（mx，max（mn，v））;
}
函数Nop（）{
  返回false；
}
函数TimeNow（）{
  返回新的Date（）。valueOf（）;
}
函数SortList（l，f）{
  var nl = []，tl = l.length，i；
  for（i = 0; i <tl; ++ i）
    nl.push（l [i]）;
  nl.sort（f）;
  返回nl；
}
函数Shuffle（a）{
  var i = a.length-1，t，p;
  当我） {
    p = ~~（Math.random（）* i）;
    t = a [i];
    a [i] = a [p];
    a [p] = t;
    - 一世;
  }
}
函数Vector（x，y，z）{
  this.x = x;
  this.y = y;
  this.z = z;
}
Vproto = Vector.prototype;
Vproto.length = function（）{
  返回sqrt（this.x * this.x + this.y * this.y + this.z * this.z）;
};
Vproto.dot = function（v）{
  返回this.x * vx + this.y * vy + this.z * vz;
};
Vproto.cross = function（v）{
  var x = this.y * vz-this.z * vy，
    y = this.z * vx-this.x * vz，
    z = this.x * vy-this.y * vx;
  返回新的Vector（x，y，z）;
};
Vproto.angle = function（v）{
  var dot = this.dot（v），ac;
  if（点== 0）
    返回Math.PI / 2.0;
  ac =点/（this.length（）* v.length（））;
  如果（ac> = 1）
    返回0;
  如果（ac <= -1）
    返回Math.PI;
  返回Math.acos（ac）;
};
Vproto.unit = function（）{
  var l = this.length（）;
  返回新的Vector（this.x / l，this.y / l，this.z / l）;
};
函数MakeVector（lg，lt）{
  lt = lt * Math.PI / 180;
  lg = lg * Math.PI / 180;
  var x = sin（lg）* cos（lt），y = -sin（lt），z = -cos（lg）* cos（lt）;
  返回新的Vector（x，y，z）;
}
函数Matrix（a）{
  this [1] = {1：a [0]，2：a [1]，3：a [2]};
  this [2] = {1：a [3]，2：a [4]，3：a [5]}；
  this [3] = {1：a [6]，2：a [7]，3：a [8]}；
}
Mproto = Matrix.prototype;
Matrix.Identity = function（）{
  返回新的Matrix（[1,0,0，0,1,0，0,0,1]）;
};
Matrix.Rotation = function（angle，u）{
  var sina = sin（angle），cosa = cos（angle），mcos = 1-cosa;
  返回新的Matrix（[
    cosa + pow（ux，2）* mcos，ux * uy * mcos-uz * sina，ux * uz * mcos + uy * sina，
    uy * ux * mcos + uz * sina，cosa + pow（uy，2）* mcos，uy * uz * mcos-ux * sina，
    uz * ux * mcos-uy * sina，uz * uy * mcos + ux * sina，cosa + pow（uz，2）* mcos
  ]）;
}
Mproto.mul = function（m）{
  var a = []，i，j，mmatrix =（m.xform？1：0）;
  for（i = 1; i <= 3; ++ i）
    for（j = 1; j <= 3; ++ j）{
      如果（mmatrix）
        a.push（this [i] [1] * m [1] [j] +
          这个[i] [2] * m [2] [j] +
          this [i] [3] * m [3] [j]）；
      其他
        a.push（this [i] [j] * m）;
    }
  返回新的Matrix（a）;
};
Mproto.xform = function（p）{
  var a = {}，x = px，y = py，z = pz；
  ax = x * this [1] [1] + y * this [2] [1] + z * this [3] [1];
  ay = x * this [1] [2] + y * this [2] [2] + z * this [3] [2];
  az = x * this [1] [3] + y * this [2] [3] + z * this [3] [3];
  返回
};
函数PointsOnSphere（n，xr，yr，zr，magic）{
  var i，y，r，phi，pts = []，off = 2 / n，inc;
  inc = Math.PI *（3-sqrt（5）+（parseFloat（magic）？parseFloat（magic）：0））;
  for（i = 0; i <n; ++ i）{
    y = i *关-1 +（关/ 2）;
    r = sqrt（1-y * y）;
    phi =我*公司;
    pts.push（[cos（phi）* r * xr，y * yr，sin（phi）* r * zr]）;
  }
  返回分数；
}
函数Cylinder（n，o，xr，yr，zr，magic）{
  var phi，pts = []，off = 2 / n，inc，i，j，k，l;
  inc = Math.PI *（3-sqrt（5）+（parseFloat（magic）？parseFloat（magic）：0））;
  for（i = 0; i <n; ++ i）{
    j = i *关-1 +（关/ 2）;
    phi =我*公司;
    k = cos（phi）;
    l = sin（phi）;
    pts.push（o？[j * xr，k * yr，l * zr]：[k * xr，j * yr，l * zr]）；
  }
  返回分数；
}
函数Ring（o，n，xr，yr，zr，j）{
  var phi，pts = []，inc = Math.PI * 2 / n，i，k，l;
  for（i = 0; i <n; ++ i）{
    phi =我*公司;
    k = cos（phi）;
    l = sin（phi）;
    pts.push（o？[j * xr，k * yr，l * zr]：[k * xr，j * yr，l * zr]）；
  }
  返回分数；
}
函数PointsOnCylinderV（n，xr，yr，zr，m）{return Cylinder（n，0，xr，yr，zr，m）}
函数PointsOnCylinderH（n，xr，yr，zr，m）{return Cylinder（n，1，xr，yr，zr，m）}
函数PointsOnRingV（n，xr，yr，zr，offset）{
  offset = isNaN（offset）？0：偏移* 1;
  Return Ring（0，n，xr，yr，zr，offset）;
}
函数PointsOnRingH（n，xr，yr，zr，offset）{
  offset = isNaN（offset）？0：偏移* 1;
  Return Ring（1，n，xr，yr，zr，offset）;
}
函数CentreImage（t）{
  var i =新图片；
  i.onload = function（）{
    var dx = i.width / 2，dy = i.height / 2;
    t.centreFunc = function（c，w，h，cx，cy）{
      c.setTransform（1、0、0、1、0、0）;
      c.globalAlpha = 1;
      c.drawImage（i，cx-dx，cy-dy）;
    };
  };
  i.src = t.centreImage;
}
函数SetAlpha（c，a）{
  var d = c，p1，p2，ae =（a * 1）.toPrecision（3）+'）';
  if（c [0] ==='＃'）{
    if（！hexlookup3 [c]）
      if（c.length === 4）
        hexlookup3 [c] ='rgba（'+ hexlookup1 [c [1]] + hexlookup1 [c [2]] + hexlookup1 [c [3]];
      其他
        hexlookup3 [c] ='rgba（'+ hexlookup2 [c.substr（1,2）] + hexlookup2 [c.substr（3,2）] + hexlookup2 [c.substr（5,2）];
    d = hexlookup3 [c] + ae;
  } else if（c.substr（0,4）==='rgb（'|| c.substr（0,4）==='hsl（'）{
    d =（c.replace（'（'，'a（'）。replace（'）'，'，'+ ae））;
  } else if（c.substr（0,5）==='rgba（'|| c.substr（0,5）==='hsla（'）{
    p1 = c.lastIndexOf（'，'）+ 1，p2 = c.indexOf（'）'）;
    * * parseFloat（c.substring（p1，p2））;
    d = c.substr（0，p1）+ a.toPrecision（3）+'）';
  }
  返回d;
}
函数NewCanvas（w，h）{
  //如果使用exanvas，请立即放弃
  如果（window.G_vmlCanvasManager）
    返回null;
  var c = doc.createElement（'canvas'）;
  c.width = w;
  c.height = h;
  返回c;
}
//我认为所有浏览器现在都可以通过此测试...
函数ShadowAlphaBroken（）{
  var cv = NewCanvas（3,3），c，i;
  如果（！cv）
    返回false；
  c = cv.getContext（'2d'）;
  c.strokeStyle ='＃000';
  c.shadowColor ='#fff';
  c.shadowBlur = 3;
  c.globalAlpha = 0;
  c.strokeRect（2,2,2,2）;
  c.globalAlpha = 1;
  i = c.getImageData（2,2,1,1）;
  cv = null;
  返回（i.data [0]> 0）;
}
函数SetGradient（c，l，o，g）{
  var gd = c.createLinearGradient（0，0，l，0），i;
  对于（i in g）
    gd.addColorStop（1- i，g [i]）;
  c.fillStyle = gd;
  c.fillRect（0，o，l，1）;
}
函数FindGradientColour（tc，p，r）{
  var l = 1024，h = 1，gl = tc.weightGradient，cv，c，i，d;
  if（tc.gCanvas）{
    c = tc.gCanvas.getContext（'2d'）;
    h = tc.gCanvas.height;
  }其他{
    if（IsObject（gl [0]））
      h = gl.length;
    其他
      gl = [gl];
    tc.gCanvas = cv = NewCanvas（l，h）;
    如果（！cv）
      返回null;
    c = cv.getContext（'2d'）;
    for（i = 0; i <h; ++ i）
      SetGradient（c，l，i，gl [i]）;
  }
  r = max（min（r || 0，h-1），0）;
  d = c.getImageData（~~（（1-1）* p），r，1，1）.data;
  返回'rgba（'+ d [0] +'，'+ d [1] +'，'+ d [2] +'，'+（d [3] / 255）+'）';
}
函数TextSet（ctxt，字体，颜色，字符串，padx，pady，shadowColour，
  shadowBlur，shadowOffsets，maxWidth，widths，align）{
  var xo = padx +（shadowBlur || 0）+ 
    （shadowOffsets.length && shadowOffsets [0] <0？abs（shadowOffsets [0]）：0），
    yo = pady +（shadowBlur || 0）+ 
    （shadowOffsets.length && shadowOffsets [1] <0？abs（shadowOffsets [1]）：0），i，xc;
  ctxt.font =字体;
  ctxt.textBaseline ='顶部';
  ctxt.fillStyle =颜色
  shadowColour &&（ctxt.shadowColor = shadowColour）;
  shadowBlur &&（ctxt.shadowBlur = shadowBlur）;
  shadowOffsets.length &&（ctxt.shadowOffsetX = shadowOffsets [0]，
    ctxt.shadowOffsetY = shadowOffsets [1]）;
  for（i = 0; i <strings.length; ++ i）{
    xc = 0;
    if（widths）{
      if（'right'== align）{
        xc = maxWidth-widths [i];
      } else if（'centre'== align）{
        xc =（maxWidth-widths [i]）/ 2;
      }
    }
    ctxt.fillText（strings [i]，xo + xc，yo）;
    yo + = parseInt（font）;
  }
}
函数RRect（c，x，y，w，h，r，s）{
  如果（r）{
    c.beginPath（）;
    c.moveTo（x，y + h-r）;
    c.arcTo（x，y，x + r，y，r）;
    c.arcTo（x + w，y，x + w，y + r，r）;
    c.arcTo（x + w，y + h，x + w-r，y + h，r）;
    c.arcTo（x，y + h，x，y + h-r，r）;
    c.closePath（）;
    c [s？'stroke'：'fill']（）;
  }其他{
    c [s？'strokeRect'：'fillRect']（x，y，w，h）;
  }
}
函数TextCanvas（字符串，字体，w，h，maxWidth，stringWidths，align，valign，
  规模）{
  this.strings =字符串；
  this.font =字体;
  this.width = w;
  this.height = h;
  this.maxWidth = maxWidth;
  this.stringWidths = stringWidths;
  this.align = align;
  this.valign = valign;
  this.scale =规模；
}
TCVproto = TextCanvas.prototype;
TCVproto.SetImage = function（image，w，h，position，padding，align，valign，
  规模）{
  this.image =图片；
  this.iwidth = w * this.scale;
  this.iheight = h * this.scale;
  this.ipos =位置；
  this.ipad = padding * this.scale;
  this.iscale =规模；
  this.ialign = align;
  this.ivalign = valign;
};
TCVproto.Align = function（size，space，a）{
  var pos = 0;
  if（a =='右'|| a =='底'）
    pos =空间-大小；
  否则if（a！='left'&& a！='top'）
    pos =（空格-大小）/ 2;
  返回pos
};
TCVproto.Create = function（color，bgColour，bgOutline，bgOutlineThickness，
  shadowColour，shadowBlur，shadowOffsets，padding，radius）{
  var cv，cw，ch，c，x1，x2，y1，y2，offx，offy，ix，iy，iw，ih，rr，
    sox = abs（shadowOffsets [0]），soy = abs（shadowOffsets [1]），shadowcv，shadowc;
  padding = max（padding，sox + shadowBlur，soy + shadowBlur）;
  x1 = 2 *（padding + bgOutlineThickness）;
  y1 = 2 *（padding + bgOutlineThickness）;
  cw = this.width + x1;
  ch = this.height + y1;
  offx = offy =填充+ bgOutlineThickness;

  if（this.image）{
    ix = iy = padding + bgOutlineThickness;
    iw = this.iwidth;
    ih = this.iheight;
    if（this.ipos =='top'|| this.ipos =='bottom'）{
      if（iw <this.width）
        ix + = this.Align（iw，this.width，this.ialign）;
      其他
        offx + = this.Align（this.width，iw，this.align）;
      如果（this.ipos =='top'）
        offy + = ih + this.ipad;
      其他
        iy + = this.height + this.ipad;
      cw = max（cw，iw + x1）;
      ch + = ih + this.ipad;
    }其他{
      if（ih <this.height）
        iy + = this.Align（ih，this.height，this.ivalign）;
      其他
        offy + = this.Align（this.height，ih，this.valign）;
      if（this.ipos =='正确'）
        ix + = this.width + this.ipad;
      其他
        offx + = iw + this.ipad;
      cw + = iw + this.ipad;
      ch = max（ch，ih + y1）;
    }
  }

  cv = NewCanvas（cw，ch）;
  如果（！cv）
    返回null;
  x1 = y1 = bgOutlineThickness / 2;
  x2 = cw-bgOutlineThickness;
  y2 = ch-bgOutlineThickness;
  rr = min（半径，x2 / 2，y2 / 2）;
  c = cv.getContext（'2d'）;
  if（bgColour）{
    c.fillStyle = bgColour;
    RRect（c，x1，y1，x2，y2，rr）;
  }
  if（bgOutlineThickness）{
    c.strokeStyle = bgOutline;
    c.lineWidth = bgOutlineThickness;
    RRect（c，x1，y1，x2，y2，rr，true）;
  }
  if（shadowBlur || sox || soy）{
    //使用透明的画布进行绘制
    shadowcv = NewCanvas（cw，ch）;
    if（shadowcv）{
      shadowc = c;
      c = shadowcv.getContext（'2d'）;
    }
  }

  //不要使用TextSet阴影支持，因为它会增加阴影空间
  TextSet（c，this.font，colour，this.strings，offx，offy，0，0，[]，
    this.maxWidth，this.stringWidths，this.align）;
      
  如果（this.image）
    c.drawImage（this.image，ix，iy，iw，ih）;

  if（shadowc）{
    //绘制带有阴影的文本和图像
    c =阴影c;
    shadowColour &&（c.shadowColor = shadowColour）;
    shadowBlur &&（c.shadowBlur = shadowBlur）;
    c.shadowOffsetX = shadowOffsets [0];
    c.shadowOffsetY = shadowOffsets [1];
    c.drawImage（shadowcv，0，0）;
  }
  返回简历；
};
函数ExpandImage（i，w，h）{
  var cv = NewCanvas（w，h），c;
  如果（！cv）
    返回null;
  c = cv.getContext（'2d'）;
  c.drawImage（i，（w-i.width）/ 2，（h-i.height）/ 2）;
  返回简历；
}
函数ScaleImage（i，w，h）{
  var cv = NewCanvas（w，h），c;
  如果（！cv）
    返回null;
  c = cv.getContext（'2d'）;
  c.drawImage（i，0，0，w，h）;
  返回简历；
}
函数AddBackgroundToImage（i，w，h，scale，colour，othickness，ocolour，
  填充，半径，偏移量）{
  var cw = w +（（（2 * padding）+ othickness）*规模，
    ch = h +（（2 * padding）+ othickness）*比例，
    cv = NewCanvas（cw，ch），c，x1，y1，x2，y2，ocanvas，cc，rr;
  如果（！cv）
    返回null;
  纤度* =规模；
  半径* =比例;
  x1 = y1 =粘稠度/ 2;
  x2 = cw-稠度；
  y2 = ch-稠度;
  padding =（padding * scale）+ x1; //为大纲添加空间
  c = cv.getContext（'2d'）;
  rr = min（半径，x2 / 2，y2 / 2）;
  如果（颜色）{
    c.fillStyle =颜色；
    RRect（c，x1，y1，x2，y2，rr）;
  }
  如果（硬度）{
    c.strokeStyle = ocolour;
    c.lineWidth =粘稠度；
    RRect（c，x1，y1，x2，y2，rr，true）;
  }
  
  if（ofill）{
    //使用合成为图像和边框上色
    ocanvas = NewCanvas（cw，ch）;
    cc = ocanvas.getContext（'2d'）;
    cc.drawImage（i，padding，padding，w，h）;
    cc.globalCompositeOperation ='源入';
    cc.fillStyle = ocolour;
    cc.fillRect（0，0，cw，ch）;
    cc.globalCompositeOperation ='目标结束';
    cc.drawImage（cv，0，0）;
    cc.globalCompositeOperation ='源于';
    c.drawImage（ocanvas，0，0）;
  }其他{
    c.drawImage（i，padding，padding，i.width，i.height）;
  }
  return {image：cv，width：cw / scale，height：ch / scale};
}
/ **
 *四舍五入图像的角落
 * /
函数RoundImage（i，r，iw，ih，s）{
  var cv，c，r1 = parseFloat（r），l = max（iw，ih）;
  cv = NewCanvas（iw，ih）;
  如果（！cv）
    返回null;
  if（r.indexOf（'％'）> 0）
    r1 = l * r1 / 100;
  其他
    r1 = r1 * s;
  c = cv.getContext（'2d'）;
  c.globalCompositeOperation ='源于';
  c.fillStyle ='#fff';
  if（r1> = l / 2）{
    r1 = min（iw，ih）/ 2;
    c.beginPath（）;
    c.moveTo（iw / 2，ih / 2）;
    c.arc（iw / 2，ih / 2，r1,0,2 * Math.PI，false）;
    c.fill（）;
    c.closePath（）;
  }其他{
    r1 = min（iw / 2，ih / 2，r1）;
    RRect（c，0，0，iw，ih，r1，true）;
    c.fill（）;
  }
  c.globalCompositeOperation ='source-in';
  c.drawImage（i，0，0，iw，ih）;
  返回简历；
}
/ **
 *创建一个包含图像及其阴影的新画布
 *返回一个对象，其中包含图像及其在z = 0处的尺寸
 * /
函数AddShadowToImage（i，w，h，scale，sc，sb，so）{
  var sw = abs（so [0]），sh = abs（so [1]）， 
    cw = w +（sw> sb？sw + sb：sb * 2）*比例，
    ch = h +（sh> sb？sh + sb：sb * 2）*标度，
    xo =比例*（（sb || 0）+（so [0] <0？sw：0）），
    yo =比例*（（sb || 0）+（so [1] <0？sh：0）），cv，c;
  cv = NewCanvas（cw，ch）;
  如果（！cv）
    返回null;
  c = cv.getContext（'2d'）;
  sc &&（c.shadowColor = sc）;
  sb &&（c.shadowBlur = sb *标度）;
  so &&（c.shadowOffsetX = so [0] *比例尺，c.shadowOffsetY = so [1] *比例尺）；
  c.drawImage（i，xo，yo，w，h）;
  return {image：cv，width：cw / scale，height：ch / scale};
}
函数FindTextBoundingBox（s，f，ht）{
  var w = parseInt（s.toString（）。length * ht），h = parseInt（ht * 2 * s.length），
    cv = NewCanvas（w，h），c，idata，w1，h1，x，y，i，ex;
  如果（！cv）
    返回null;
  c = cv.getContext（'2d'）;
  c.fillStyle ='＃000';
  c.fillRect（0,0，w，h）;
  TextSet（c，ht +'px'+ f，'＃fff'，s，0,0,0,0，[]，'centre'）

  idata = c.getImageData（0,0，w，h）;
  w1 = idata.width; h1 = idata.height;
  例如= {
    min：{x：w1，y：h1}，
    最大值：{x：-1，y：-1}
  };
  for（y = 0; y <h1; ++ y）{
    for（x = 0; x <w1; ++ x）{
      i =（y * w1 + x）* 4;
      if（idata.data [i + 1]> 0）{
        if（x <ex.min.x）ex.min.x = x;
        if（x> ex.max.x）ex.max.x = x;
        if（y <ex.min.y）ex.min.y = y;
        if（y> ex.max.y）ex.max.y = y;
      }
    }
  }
  //设备像素可能不是CSS像素
  if（w1！= w）{
    ex.min.x * =（w / w1）;
    最大值x * =（w / w1）;
  }
  if（h1！= h）{
    ex.min.y * =（w / h1）;
    最大值y * =（w / h1）;
  }

  cv = null;
  返回ex
}
函数FixFont（f）{
  返回“'” + f.replace（/（\'| \“）/ g，''）。replace（/ \ s *，\ s * / g，”'，'“）+”'“;
}
函数AddHandler（h，f，e）{
  e = e || doc;
  如果（e.addEventListener）
    e.addEventListener（h，f，false）;
  其他
    e.attachEvent（'on'+ h，f）;
}
函数RemoveHandler（h，f，e）{
  e = e || doc;
  如果（e.removeEventListener）
    e.removeEventListener（h，f）;
  其他
    e.detachEvent（'on'+ h，f）;
}
函数AddImage（i，o，t，tc）{
  var s = tc.imageScale，mscale，ic，bc，oc，iw，ih;
  //图片未加载，等待图片加载
  if（！o.complete）
    返回AddHandler（'load'，function（）{AddImage（i，o，t，tc）;}，o）;
  如果（！i.complete）
    返回AddHandler（'load'，function（）{AddImage（i，o，t，tc）;}，i）;

  //是的，这的确看起来很废话，但是可以确保
  //实际上是设置了宽度和高度，而不仅仅是计算了宽度和高度。这是
  //需要在隐藏图像时保持比例大小，因此
  //图像可以再次用于其他云。
  o.width = o.width;
  o.height = o.height;

  如果{
    i.width = o.width * s;
    i.height = o.height * s;
  }
  //图片的标准宽度，并应用了imageScale
  t.iw = i.width;
  t.ih = i.height;
  if（tc.txtOpt）{
    ic = i;
    mscale = tc.zoomMax * tc.txtScale;
    iw = t.iw * mscale;
    ih = t.ih * mscale;
    if（iw <o.naturalWidth || ih <o.naturalHeight）{
      ic = ScaleImage（i，iw，ih）;
      如果（ic）
        t.fimage = ic;
    }其他{
      iw = t.iw;
      ih = t.ih;
      mscale = 1;
    }
    如果（parseFloat（tc.imageRadius））
      t.image = t.fimage = i = RoundImage（t.image，tc.imageRadius，iw，ih，mscale）;
    if（！t.HasText（））{
      if（tc.shadow）{
        ic = AddShadowToImage（t.image，iw，ih，mscale，tc.shadow，tc.shadowBlur，
          tc.shadowOffset）;
        if（ic）{
          t.fimage = ic.image;
          tw = ic.width;
          th = ic.height;
        }
      }
      if（tc.bgColour || tc.bgOutlineThickness）{
        bc = tc.bgColour =='标签'吗？GetProperty（ta，'background-color'）：
          tc.bgColour;
        oc = tc.bgOutline =='标签'吗？GetProperty（ta，'color'）：
          （tc.bgOutline || tc.textColour）;
        iw = t.fimage.width;
        ih = t.fimage.height;
        if（tc.outlineMethod =='颜色'）{
          //首先使用当前图像状态创建轮廓版本
          ic = AddBackgroundToImage（t.fimage，iw，ih，mscale，bc，
            tc.bgOutlineThickness，t.outline.colour，tc.padding，tc.bgRadius，1）;
          如果（ic）
            t.oimage = ic.image;
        }
        ic = AddBackgroundToImage（t.fimage，iw，ih，mscale，bc， 
          tc.bgOutlineThickness，oc，tc.padding，tc.bgRadius）;
        if（ic）{
          t.fimage = ic.image;
          tw = ic.width;
          th = ic.height;
        }
      }
      if（tc.outlineMethod =='大小'）{
        if（tc.outlineIncrease> 0）{
          t.iw + = 2 * tc.outlineIncrease;
          t.ih + = 2 * tc.outlineIncrease;
          iw = mscale * t.iw;
          ih = mscale * t.ih;
          ic = ScaleImage（t.fimage，iw，ih）;
          t.oimage = ic;
          t.fimage = ExpandImage（t.fimage，t.oimage.width，t.oimage.height）;
        }其他{
          iw = mscale *（t.iw +（2 * tc.outlineIncrease））;
          ih = mscale *（t.ih +（2 * tc.outlineIncrease））;
          ic = ScaleImage（t.fimage，iw，ih）;
          t.oimage = ExpandImage（ic，t.fimage.width，t.fimage.height）;
        }
      }
    }
  }
  t.Init（）;
}
函数GetProperty（e，p）{
  var dv = doc.defaultView，pc = p.replace（/ \-（[az]）/ g，function（a）{return a.charAt（1）.toUpperCase（）}）;
  返回（dv && dv.getComputedStyle && dv.getComputedStyle（e，null）.getPropertyValue（p））||
    （e.currentStyle && e.currentStyle [pc]）;
}
函数FindWeight（a，wFrom，tHeight）{
  var w = 1，p;
  if（wFrom）{
    w = 1 *（a.getAttribute（wFrom）|| tHeight）;
  } else if（p = GetProperty（a，'font-size'））{
    w =（p.indexOf（'px'）> -1 && p.replace（'px'，''）* 1）||
      （p.indexOf（'pt'）> -1 && p.replace（'pt'，''）* 1.25）||
      p * 3.3；
  }
  返回w;
}
函数EventToCanvasId（e）{
  返回e.target && Defined（e.target.id）吗？e.target.id：
    e.srcElement.parentNode.id;
}
函数EventXY（e，c）{
  var xy，p，xmul = parseInt（GetProperty（c，'width'））/ c.width，
    ymul = parseInt（GetProperty（c，'height'））/ c.height;
  if（Defined（e.offsetX））{
    xy = {x：e.offsetX，y：e.offsetY};
  }其他{
    p = AbsPos（c.id）;
    如果（定义（e.changedTouches））
      e = e.changedTouches [0];
    如果（e.pageX）
      xy = {x：e.pageX-px，y：e.pageY-py};
  }
  if（xy && xmul && ymul）{
    xy.x / = xmul;
    xy.y / = ymul;
  }
  返回xy;
}
函数MouseOut（e）{
  var cv = e.target || e.fromElement.parentNode，tc = TagCanvas.tc [cv.id];
  if（tc）{
   tc.mx = tc.my = -1;
   tc.UnFreeze（）;
   tc.EndDrag（）;
  }
}
函数MouseMove（e）{
  var i，t = TagCanvas，tc，p，tg = EventToCanvasId（e）;
  for（i in t.tc）{
    tc = t.tc [i];
    if（tc.tttimer）{
      clearTimeout（tc.tttimer）;
      tc.tttimer = null;
    }
  }
  if（tg && t.tc [tg]）{
    tc = t.tc [tg];
    if（p = EventXY（e，tc.canvas））{
      tc.mx = px;
      tc.my = py;
      tc.Drag（e，p）;
    }
    tc.drawn = 0;
  }
}
函数MouseDown（e）{
  var t = TagCanvas，cb = doc.addEventListener？0：1
    tg = EventToCanvasId（e）;
  if（tg && e.button == cb && t.tc [tg]）{
    t.tc [tg] .BeginDrag（e）;
  }
}
功能MouseUp（e）{
  var t = TagCanvas，cb = doc.addEventListener？0：1
    tg = EventToCanvasId（e），tc;
  if（tg && e.button == cb && t.tc [tg]）{
    tc = t.tc [tg];
    MouseMove（e）;
    if（！tc.EndDrag（）&&！tc.touchState）
      tc.Clicked（e）;
  }
}
函数TouchDown（e）{
  var tg = EventToCanvasId（e），tc =（tg && TagCanvas.tc [tg]），p；
  if（tc && e.changedTouches）{
    if（e.touches.length == 1 && tc.touchState == 0）{
      tc.touchState = 1;
      tc.BeginDrag（e）;
      if（p = EventXY（e，tc.canvas））{
        tc.mx = px;
        tc.my = py;
        tc.drawn = 0;
      }
    } else if（e.targetTouches.length == 2 && tc.pinchZoom）{
      tc.touchState = 3;
      tc.EndDrag（）;
      tc.BeginPinch（e）;
    }其他{
      tc.EndDrag（）;
      tc.EndPinch（）;
      tc.touchState = 0;
    }
  }
}
功能TouchUp（e）{
  var tg = EventToCanvasId（e），tc =（tg && TagCanvas.tc [tg]）;
  if（tc && e.changedTouches）{
    开关（tc.touchState）{
    情况1：
      tc.Draw（）;
      tc.Clicked（）;
      打破;
    情况2：
      tc.EndDrag（）;
      打破;
    情况3：
      tc.EndPinch（）;
    }
    tc.touchState = 0;
  }
}
功能TouchMove（e）{
  var i，t = TagCanvas，tc，p，tg = EventToCanvasId（e）;
  for（i in t.tc）{
    tc = t.tc [i];
    if（tc.tttimer）{
      clearTimeout（tc.tttimer）;
      tc.tttimer = null;
    }
  }
  tc =（tg && t.tc [tg]）;
  if（tc && e.changedTouches && tc.touchState）{
    开关（tc.touchState）{
    情况1：
    情况2：
      if（p = EventXY（e，tc.canvas））{
        tc.mx = px;
        tc.my = py;
        if（tc.Drag（e，p））
          tc.touchState = 2;
      }
      打破;
    情况3：
      tc.Pinch（e）;
    }
    tc.drawn = 0;
  }
}
函数MouseWheel（e）{
  var t = TagCanvas，tg = EventToCanvasId（e）;
  if（tg && t.tc [tg]）{
    e.cancelBubble = true;
    e.returnValue = false;
    e.preventDefault && e.preventDefault（）;
    t.tc [tg] .Wheel（（e.wheelDelta || e.detail）> 0）;
  }
}
函数Scroll（e）{
  var i，t = TagCanvas;
  clearTimeout（t.scrollTimer）;
  for（i in t.tc）{
    t.tc [i] .Pause（）;
  }
  t.scrollTimer = setTimeout（function（）{
    var i，t = TagCanvas;
    for（i in t.tc）{
      t.tc [i] .Resume（）;
    }
  }，t.scrollPause）;
}
函数DrawCanvas（）{
  DrawCanvasRAF（TimeNow（））;
}
函数DrawCanvasRAF（t）{
  var tc = TagCanvas.tc，i;
  TagCanvas.NextFrame（TagCanvas.interval）;
  t = t || 是时候了（）;
  为（我在tc中）
    tc [i] .Draw（t）;
}
函数AbsPos（id）{
  var e = doc.getElementById（id），r = e.getBoundingClientRect（），
    dd = doc.documentElement，b = doc.body，w =窗口，
    xs = w.pageXOffset || dd.scrollLeft，
    ys = w.pageYOffset || dd.scrollTop，
    xo = dd.clientLeft || b.clientLeft，
    yo = dd.clientTop || b.clientTop;
  return {x：r.left + xs-xo，y：r.top + ys-yo};
}
函数Project（tc，p1，sx，sy）{
  var m = tc.radius * tc.z1 /（tc.z1 + tc.z2 + p1.z）;
  返回{
    x：p1.x * m * sx，
    y：p1.y * m * sy，
    z：p1.z，
    w：（tc.z1-p1.z）/ tc.z2
  };
}
/ **
 * @构造函数
 *用于递归拆分<br>标签上的标签内容
 * /
函数TextSplitter（e）{
  this.e = e;
  this.br = 0;
  this.line = [];
  this.text = [];
  this.original = e.innerText || e.textContent;
}
TSproto = TextSplitter.prototype;
TSproto.Empty = function（）{
  for（var i = 0; i <this.text.length; ++ i）
    if（this.text [i] .length）
      返回false；
  返回true；
};
TSproto.Lines = function（e）{
  var r = e？1：0，cn，cl，i;
  e = e || 这; e;
  cn = e.childNodes;
  cl = cn.length;

  for（i = 0; i <cl; ++ i）{
    if（cn [i] .nodeName =='BR'）{
      this.text.push（this.line.join（''））;
      this.br = 1;
    } else if（cn [i] .nodeType == 3）{
      如果（this.br）{
        this.line = [cn [i] .nodeValue];
        this.br = 0;
      }其他{
        this.line.push（cn [i] .nodeValue）;
      }
    }其他{
      this.Lines（cn [i]）;
    }
  }
  r || this.br || this.text.push（this.line.join（''））;
  返回this.text;
};
TSproto.SplitWidth = function（w，c，f，h）{
  var i，j，words，text = [];
  c.font = h +'px'+ f;
  for（i = 0; i <this.text.length; ++ i）{
    单词= this.text [i] .split（/ \ s + /）;
    this.line = [words [0]];
    for（j = 1; j <words.length; ++ j）{
      if（c.measureText（this.line.join（''）+''+ words [j]）。width> w）{
        text.push（this.line.join（''））;
        this.line = [words [j]];
      }其他{
        this.line.push（words [j]）;
      }
    }
    text.push（this.line.join（''））;
  }
  返回this.text = text;
};
/ **
 * @构造函数
 * /
函数Outline（tc，t）{
  this.ts = null;
  this.tc = tc;
  this.tag = t;
  this.x = this.y = this.w = this.h = this.sc = 1;
  this.z = 0;
  this.pulse = 1;
  this.pulsate = tc.pulsateTo <1;
  this.colour = tc.outlineColour;
  this.adash = ~~ tc.outlineDash;
  this.agap = ~~ tc.outlineDashSpace || 这
  this.aspeed = tc.outlineDashSpeed * 1;
  if（this.colour =='标签'）
    this.colour = GetProperty（ta，'color'）;
  否则if（this.colour =='tagbg'）
    this.colour = GetProperty（ta，'background-color'）;
  this.Draw = this.pulsate吗？this.DrawPulsate：this.DrawSimple;
  this.radius = tc.outlineRadius | 0;
  this.SetMethod（tc.outlineMethod）;
}
Oproto = Outline.prototype;
Oproto.SetMethod = function（om）{
  var方法= {
    块：['PreDraw'，'DrawBlock']，
    颜色：['PreDraw'，'DrawColour']，
    轮廓：['PostDraw'，'DrawOutline']，
    经典：['LastDraw'，'DrawOutline']，
    大小：['PreDraw'，'DrawSize']，
    无：['LastDraw']
  }，funcs = methods [om] || method.outline;
  if（om =='none'）{
    this.Draw = function（）{return 1; }
  }其他{
    this.drawFunc = this [funcs [1]];
  }
  this [funcs [0]] = this.Draw;
};
Oproto.Update = function（x，y，w，h，sc，z，xo，yo）{
  var o = this.tc.outlineOffset，o2 = 2 * o;
  this.x = sc * x + xo-o;
  y = sc * y + yo-o;
  this.w = sc * w + o2;
  this.h = sc * h + o2;
  this.sc = sc; //用于确定最前面
  this.z = z;
};
Oproto.Ants = function（c）{
  如果（！this.adash）
    返回;
  var l = this.adash，g = this.agap，s = this.aspeed，长度= l + g，
    l1 = 0，l2 = 1，g1 = g，g2 = 0，seq = 0，蚂蚁；
  如果{
    seq = abs（s）*（TimeNow（）-this.ts）/ 50;
    如果（s <0）
      序列= 8.64e6-序列;
    s = ~~ seq％长度；
  }
  如果{
    if（l> = s）{
      l1 = l-s;
      l2 = s;
    }其他{
      g1 =长度-s;
      g2 = g-g1;
    }
    蚂蚁= [l1，g1，l2，g2];
  }其他{
    蚂蚁= [l，g];
  }
  c.setLineDash（ants）;
}
Oproto.DrawOutline = function（c，x，y，w，h，colour）{
  var r = min（this.radius，h / 2，w / 2）;
  c.strokeStyle =颜色；
  this.Ants（c）;
  RRect（c，x，y，w，h，r，true）;
};
Oproto.DrawSize = function（c，x，y，w，h，colour，tag，x1，y1）{
  var tw = tag.w，th = tag.h，m，i，sc;
  if（this.pulsate）{
    如果（tag.image）
      sc =（tag.image.height + this.tc.outlineIncrease）/ tag.image.height;
    其他
      sc = tag.oscale;
    我= tag.fimage || tag.image;
    m = 1 +（（sc-1）*（1-this.pulse））;
    tag.h * = m;
    tag.w * = m;
  }其他{
    我= tag.oimage;
  }
  tag.alpha = 1;
  tag.Draw（c，x1，y1，i）;
  tag.h = th;
  tag.w = tw;
  返回1;
};
Oproto.DrawColour = function（c，x，y，w，h，colour，tag，x1，y1）{
  if（tag.oimage）{
    if（this.pulse <1）{
      tag.alpha = 1-pow（this.pulse，2）;
      tag.Draw（c，x1，y1，tag.fimage）;
      tag.alpha = this.pulse;
    }其他{
      tag.alpha = 1;
    }
    tag.Draw（c，x1，y1，tag.oimage）;
    返回1;
  }
  返回this [tag.image？'DrawColourImage'：'DrawColourText']（c，x，y，w，h，colour，tag，x1，y1）;
};
Oproto.DrawColourText = function（c，x，y，w，h，colour，tag，x1，y1）{
  var normal = tag.colour;
  tag.colour =颜色；
  tag.alpha = 1;
  tag.Draw（c，x1，y1）;
  tag.colour =正常；
  返回1;
};
Oproto.DrawColourImage = function（c，x，y，w，h，colour，tag，x1，y1）{
  var ccanvas = c.canvas，fx = ~~ max（x，0），fy = ~~ max（y，0）， 
    fw = min（ccanvas.width-fx，w）+ .5 | 0，fh = min（ccanvas.height-fy，h）+ .5 | 0，cc;
  如果（帆布）
    ocanvas.width = fw，ocanvas.height = fh;
  其他
    ocanvas = NewCanvas（fw，fh）;
  如果（！ocanvas）
    返回this.SetMethod（'outline'）; //如果使用IE和图片，请放弃！
  cc = ocanvas.getContext（'2d'）;

  cc.drawImage（ccanvas，fx，fy，fw，fh，0,0，fw，fh）;
  c.clearRect（fx，fy，fw，fh）;
  if（this.pulsate）{
    tag.alpha = 1-pow（this.pulse，2）;
  }其他{
    tag.alpha = 1;
  }
  tag.Draw（c，x1，y1）;
  c.setTransform（1,0,0,1,0,0）;
  c.save（）;
  c.beginPath（）;
  c.rect（fx，fy，fw，fh）;
  c.clip（）;
  c.globalCompositeOperation ='source-in';
  c.fillStyle =颜色；
  c.fillRect（fx，fy，fw，fh）;
  c.restore（）;
  c.globalAlpha = 1;
  c.globalCompositeOperation ='目标结束';
  c.drawImage（ocanvas，0,0，fw，fh，fx，fy，fw，fh）;
  c.globalCompositeOperation ='源于';
  返回1;
};
Oproto.DrawBlock = function（c，x，y，w，h，colour）{
  var r = min（this.radius，h / 2，w / 2）;
  c.fillStyle =颜色；
  RRect（c，x，y，w，h，r）;
};
Oproto.DrawSimple = function（c，tag，x1，y1，ga，useGa）{
  var t = this.tc;
  c.setTransform（1,0,0,1,0,0）;
  c.strokeStyle = this.colour;
  c.lineWidth = t.outlineThickness;
  c.shadowBlur = c.shadowOffsetX = c.shadowOffsetY = 0;
  c.globalAlpha = useGa？ga：1；
  返回this.drawFunc（c，this.x，this.y，this.w，this.h，this.colour，tag，x1，y1）;
};
Oproto.DrawPulsate = function（c，tag，x1，y1）{
  var diff = TimeNow（）-this.ts，t = this.tc，
    ga = t.pulsateTo +（（（1-t.pulsateTo）* 
    （0.5 +（cos（2 *数学PI *差异/（1000 * t.pulsateTime））/ 2））））;
  this.pulse = ga = TagCanvas.Smooth（1，ga）;
  返回this.DrawSimple（c，tag，x1，y1，ga，1）;
};
Oproto.Active = function（c，x，y）{
  var a =（x> = this.x && y> = this.y &&
    x <= this.x + this.w && y <= this.y + this.h）;
  如果一个） {
    this.ts = this.ts || 是时候了（）;
  }其他{
    this.ts = null;
  }
  返回
};
Oproto.PreDraw = Oproto.PostDraw = Oproto.LastDraw = Nop;
/ **
 * @构造函数
 * /
函数Tag（tc，text，a，v，w，h，col，bcol，bradius，boutline，bothickness，
  字体，填充，原始）{
  this.tc = tc;
  this.image = null;
  this.text =文字;
  this.text_original = original;
  this.line_widths = [];
  this.title = a.title || 空值;
  this.a = a;
  this.position = new Vector（v [0]，v [1]，v [2]）;
  this.x = this.y = this.z = 0;
  this.w = w;
  this.h = h;
  this.colour = col || tc.textColour;
  this.bgColour = bcol || tc.bgColour;
  this.bgRadius = bradius | 0;
  this.bgOutline = boutline || 这种颜色
  this.bgOutlineThickness = bothickness | 0;
  this.textFont =字体|| tc.textFont;
  this.padding = padding | 0;
  this.sc = this.alpha = 1;
  this.weighted =！tc.weight;
  this.outline = new Outline（tc，this）;
}
Tproto = Tag.prototype;
Tproto.Init = function（e）{
  var tc = this.tc;
  this.textHeight = tc.textHeight;
  if（this.HasText（））{
    this.Measure（tc.ctxt，tc）;
  }其他{
    this.w = this.iw;
    this.h = this.ih;
  }

  this.SetShadowColour = tc.shadowAlpha吗？this.SetShadowColourAlpha：this.SetShadowColourFixed;
  this.SetDraw（tc）;
};
Tproto.Draw = Nop;
Tproto.HasText = function（）{
  返回this.text && this.text [0] .length> 0;
};
Tproto.EqualTo = function（e）{
  var i = e.getElementsByTagName（'img'）;
  if（this.a.href！= e.href）
    返回0;
  if（i.length）
    返回this.image.src == i [0] .src;
  return（e.innerText || e.textContent）== this.text_original;
};
Tproto.SetImage = function（i）{
  this.image = this.fimage = i;
};
Tproto.SetDraw = function（t）{
  this.Draw = this.fimage吗？（t.ie> 7？this.DrawImageIE：this.DrawImage）：this.DrawText;
  t.noSelect &&（this.CheckActive = Nop）;
};
Tproto.MeasureText = function（c）{
  var i，l = this.text.length，w = 0，wl;
  for（i = 0; i <l; ++ i）{
    this.line_widths [i] = wl = c.measureText（this.text [i]）。width;
    w = max（w，wl）;
  }
  返回w;
};
Tproto.Measure = function（c，t）{
  var范围= FindTextBoundingBox（this.text，this.textFont，this.textHeight），
    s，th，f，soff，cw，twidth，theight，img，tcv；
  //将顶部的间隙添加到高度以使底部的间隙相等
  theight =范围？scopes.max.y + scopes.min.y：this.textHeight;
  c.font = this.font = this.textHeight +'px'+ this.textFont;
  twidth = this.MeasureText（c）;
  if（t.txtOpt）{
    s = t.txtScale;
    th = s * this.textHeight;
    f = th +'px'+ this.textFont;
    soff = [s * t.shadowOffset [0]，s * t.shadowOffset [1]];
    c.font = f;
    cw = this.MeasureText（c）;
    tcv = new TextCanvas（this.text，f，cw + s，（s * theight）+ s，cw，
      this.line_widths，t.textAlign，t.textVAlign，s）;

    如果（this.image）
      tcv.SetImage（this.image，this.iw，this.ih，t.imagePosition，t.imagePadding，
        t.imageAlign，t.imageVAlign，t.imageScale）；

    img = tcv.Create（this.colour，this.bgColour，this.bgOutline，
      s * this.bgOutlineThickness，t.shadow，s * t.shadowBlur，soff，
      s * this.padding，s * this.bgRadius）；

    //使用突出显示颜色添加轮廓图像
    if（t.outlineMethod =='颜色'）{
      this.oimage = tcv.Create（this.outline.colour，this.bgColour，this.outline.colour，
        s * this.bgOutlineThickness，t.shadow，s * t.shadowBlur，soff，
        s * this.padding，s * this.bgRadius）；

    } else if（t.outlineMethod =='size'）{
      范围= FindTextBoundingBox（this.text，this.textFont，
        this.textHeight + t.outlineIncrease）;
      th =范围最大y +范围最小y;
      f =（s *（this.textHeight + t.outlineIncrease））+'px'+ this.textFont;
      c.font = f;
      cw = this.MeasureText（c）;

      tcv = new TextCanvas（this.text，f，cw + s，（s * th）+ s，cw，
        this.line_widths，t.textAlign，t.textVAlign，s）;
      如果（this.image）
        tcv.SetImage（this.image，this.iw + t.outlineIncrease，
          this.ih + t.outlineIncrease，t.imagePosition，t.imagePadding，
          t.imageAlign，t.imageVAlign，t.imageScale）；
          
      this.oimage = tcv.Create（this.colour，this.bgColour，this.bgOutline，
        s * this.bgOutlineThickness，t.shadow，s * t.shadowBlur，soff，
        s * this.padding，s * this.bgRadius）；

      this.oscale = this.oimage.width / img.width;
      if（t.outlineIncrease> 0）
        img = ExpandImage（img，this.oimage.width，this.oimage.height）;
      其他
        this.oimage = ExpandImage（this.oimage，img.width，img.height）;
    }
    if（img）{
      this.fimage = img;
      twidth = this.fimage.width / s;
      theight = this.fimage.height / s;
    }
    this.SetDraw（t）;
    t.txtOpt = !! this.fimage;
  }
  this.h =权利；
  this.w =宽度
};
Tproto.SetFont = function（f，c，bc，boc）{
  this.textFont = f;
  this.colour = c;
  this.bgColour = bc;
  this.bgOutline = boc;
  this.Measure（this.tc.ctxt，this.tc）;
};
Tproto.SetWeight = function（w）{
  var tc = this.tc，modes = tc.weightMode.split（/ [，] /），m，s，wl = w.length;
  if（！this.HasText（））
    返回;
  this.weighted = true;
  for（s = 0; s <wl; ++ s）{
    m =模式[s] || '尺寸';
    if（'both'== m）{
      this.Weight（w [s]，tc.ctxt，tc，'size'，tc.min_weight [s]， 
        tc.max_weight [s]，s）;
      this.Weight（w [s]，tc.ctxt，tc，'colour'，tc.min_weight [s]，
        tc.max_weight [s]，s）;
    }其他{
      this.Weight（w [s]，tc.ctxt，tc，m，tc.min_weight [s]，tc.max_weight [s]，s）;
    }
  }
  this.Measure（tc.ctxt，tc）;
};
Tproto.Weight = function（w，c，t，m，wmin，wmax，wnum）{
  w = isNaN（w）吗？1：w;
  var nweight =（w-wmin）/（wmax-wmin）;
  if（'颜色'== m）
    this.colour = FindGradientColour（t，nweight，wnum）;
  否则if（'bgcolour'== m）
    this.bgColour = FindGradientColour（t，nweight，wnum）;
  否则if（'bgoutline'== m）
    this.bgOutline = FindGradientColour（t，nweight，wnum）;
  否则if（'outline'== m）
    this.outline.colour = FindGradientColour（t，nweight，wnum）;
  否则if（'size'== m）{
    if（t.weightSizeMin> 0 && t.weightSizeMax> t.weightSizeMin）{
      this.textHeight = t.weightSize * 
        （t.weightSizeMin +（t.weightSizeMax-t.weightSizeMin）* nweight）;
    }其他{
      //最小textHeight为1
      this.textHeight = max（1，w * t.weightSize）;
    }
  }
};
Tproto.SetShadowColourFixed = function（c，s，a）{
  c.shadowColor = s;
};
Tproto.SetShadowColourAlpha = function（c，s，a）{
  c.shadowColor = SetAlpha（s，a）;
};
Tproto.DrawText = function（c，xoff，yoff）{
  var t = this.tc，x = this.x，y = this.y，s = this.sc，i，xl;
  c.globalAlpha = this.alpha;
  c.fillStyle = this.colour;
  t.shadow && this.SetShadowColour（c，t.shadow，this.alpha）;
  c.font = this.font;
  x + = xoff / s;
  y + =（yoff / s）-（this.h / 2）;
  for（i = 0; i <this.text.length; ++ i）{
    xl = x;
    if（'right'== t.textAlign）{
      xl + = this.w / 2-this.line_widths [i];
    } else if（'centre'== t.textAlign）{
      xl-= this.line_widths [i] / 2;
    }其他{
      xl-= this.w / 2;
    }
    c.setTransform（s，0，0，s，s * xl，s * y）;
    c.fillText（this.text [i]，0，0）;
    y + = this.textHeight;
  }
};
Tproto.DrawImage = function（c，xoff，yoff，im）{
  var x = this.x，y = this.y，s = this.sc，
    我=我|| this.fimage，w = this.w，h = this.h，a = this.alpha，
    阴影= this.shadow;
  c.globalAlpha = a;
  阴影&& this.SetShadowColour（c，shadow，a）;
  x + =（xoff / s）-（w / 2）;
  y + =（yoff / s）-（h / 2）;
  c.setTransform（s，0，0，s，s * x，s * y）;
  c.drawImage（i，0，0，w，h）;
};
Tproto.DrawImageIE = function（c，xoff，yoff）{
  var i = this.fimage，s = this.sc，
    w = i.width = this.w * s，h = i.height = this.h * s，
    x =（this.x * s）+ xoff-（w / 2），y =（this.y * s）+ yoff-（h / 2）;
  c.setTransform（1,0,0,1,0,0）;
  c.globalAlpha = this.alpha;
  c.drawImage（i，x，y）;
};
Tproto.Calc = function（m，a）{
  var pp，t = this.tc，mnb = t.min
    mxb = t.max亮度，r = t.max_radius;
  pp = m.xform（this.position）;
  this.xformed = pp;
  pp = Project（t，pp，t.stretchX，t.stretchY）;
  this.x = pp.x;
  this.y = pp.y;
  this.z = pp.z;
  this.sc = pp.w;
  this.alpha = a *钳位（mnb +（mxb-mnb）*（r-this.z）/（2 * r），0，1）;
  返回this.xformed;
};
Tproto.UpdateActive = function（c，xoff，yoff）{
  var o = this.outline，w = this.w，h = this.h，
    x = this.x-w / 2，y = this.y-h / 2;
  o.Update（x，y，w，h，this.sc，this.z，xoff，yoff）;
  返回o
};
Tproto.CheckActive = function（c，xoff，yoff）{
  var t = this.tc，o = this.UpdateActive（c，xoff，yoff）;
  返回o.Active（c，t.mx，t.my）吗？o：null；
};
Tproto.Clicked = function（e）{
  var a = this.a，t = a.target，h = a.href，evt；
  if（t！=''&& t！='_self'）{
    if（self.frames [t]）{
      self.frames [t] .document.location = h;
    }其他{
      尝试{
        if（top.frames [t]）{
          top.frames [t] .document.location = h;
          返回;
        }
      } catch（err）{
        //不同的域/端口/协议？
      }
      window.open（h，t）;
    }
    返回;
  }
  if（doc.createEvent）{
    evt = doc.createEvent（'MouseEvents'）;
    evt.initMouseEvent（'click'，1，1，window，0，0，0，0，0，0，0，0，0，0，null）;
    if（！a.dispatchEvent（evt））
      返回;
  } else if（a.fireEvent）{
    if（！a.fireEvent（'onclick'））
      返回;
  }
  doc.location = h;
};
/ **
 * @构造函数
 * /
函数TagCanvas（cid，lctr，opt）{
  var i，p，c = doc.getElementById（cid），cp = ['id'，'class'，'innerHTML']，raf;

  if（！c）抛出0;
  if（Defined（window.G_vmlCanvasManager））{
    c = window.G_vmlCanvasManager.initElement（c）;
    this.ie = parseFloat（navigator.appVersion.split（'MSIE'）[1]）;
  }
  if（c &&（！c.getContext ||！c.getContext（'2d'）。fillText））{
    p = doc.createElement（'DIV'）;
    for（i = 0; i <cp.length; ++ i）
      p [cp [i]] = c [cp [i]];
    c.parentNode.insertBefore（p，c）;
    c.parentNode.removeChild（c）;
    投0;
  }
  for（i在TagCanvas.options中）
    this [i] = opt && Defined（opt [i]）？opt [i]：
      （Defined（TagCanvas [i]）？TagCanvas [i]：TagCanvas.options [i]）;

  this.canvas = c;
  this.ctxt = c.getContext（'2d'）;
  this.z1 = 250 / max（this.depth，0.001）;
  this.z2 = this.z1 / this.zoom;
  this.radius = min（c.height，c.width）* 0.0075; //在画布中适合100的半径
  this.max_radius = 100;
  this.max_weight = [];
  this.min_weight = [];
  this.textFont = this.textFont && FixFont（this.textFont）;
  this.textHeight * = 1;
  this.imageRadius = this.imageRadius.toString（）;
  this.pulsateTo =钳位（this.pulsateTo，0，1）;
  this.minBrightness = Clamp（this.minBrightness，0，1）;
  this.maxBrightness = Clamp（this.maxBrightness，this.minBrightness，1）;
  this.ctxt.textBaseline ='top';
  this.lx =（this.lock +''）.indexOf（'x'）+1;
  this.ly =（this.lock +''）.indexOf（'y'）+ 1;
  this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
  this.fixedAlpha = 1;
  this.source = lctr || cid;
  this.repeatTags = min（64，~~ this.repeatTags）;
  this.minTags = min（200，~~ this.minTags）;
  如果（~~ this.scrollPause> 0）
    TagCanvas.scrollPause = ~~ this.scrollPause;
  其他
    this.scrollPause = 0;
  if（this.minTags> 0 && this.repeatTags <1 &&（i = this.GetTags（）。length））
    this.repeatTags = ceil（this.minTags / i）-1;
  this.transform = Matrix.Identity（）;
  this.startTime = this.time = TimeNow（）;
  this.mx = this.my = -1;
  this.centreImage && CentreImage（this）;
  this.Animate = this.dragControl吗？this.AnimateDrag：this.AnimatePosition;
  this.animTiming =（typeof TagCanvas [this.animTiming] =='功能'吗？
    TagCanvas [this.animTiming]：TagCanvas.Smooth）;
  if（this.shadowBlur || this.shadowOffset [0] || this.shadowOffset [1]）{
    //让浏览器将“ red”翻译成“＃ff0000”
    this.ctxt.shadowColor = this.shadow;
    this.shadow = this.ctxt.shadowColor;
    this.shadowAlpha = ShadowAlphaBroken（）;
  }其他{
    删除this.shadow;
  }
  this.Load（）;
  if（lctr && this.hideTags）{
    （函数（t）{
    如果（TagCanvas.loaded）
      t.HideTags（）;
    其他
      AddHandler（'load'，function（）{t.HideTags（）;}，window）;
    }）（这个）;
  }

  this.yaw = this.initial吗？this.initial [0] * this.maxSpeed：0;
  this.pitch = this.initial吗？this.initial [1] * this.maxSpeed：0;
  if（this.tooltip）{
    this.ctitle = c.title;
    c.title ='';
    if（this.tooltip =='native'）{
      this.Tooltip = this.TooltipNative;
    }其他{
      this.Tooltip = this.TooltipDiv;
      if（！this.ttdiv）{
        this.ttdiv = doc.createElement（'div'）;
        this.ttdiv.className = this.tooltipClass;
        this.ttdiv.style.position ='绝对';
        this.ttdiv.style.zIndex = c.style.zIndex +1;
        AddHandler（'mouseover'，function（e）{e.target.style.display ='none';}，this.ttdiv）;
        doc.body.appendChild（this.ttdiv）;
      }
    }
  }其他{
    this.Tooltip = this.TooltipNone;
  }
  if（！this.noMouse &&！handlers [cid]）{
    handlers [cid] = [
      ['mousemove'，MouseMove]，
      ['mouseout'，MouseOut]，
      ['mouseup'，MouseUp]，
      ['touchstart'，TouchDown]，
      ['touchend'，TouchUp]，
      ['touchcancel'，TouchUp]，
      ['touchmove'，TouchMove]
    ];
    if（this.dragControl）{
      handlers [cid] .push（[[mousedown'，MouseDown]）;
      handlers [cid] .push（[['selectstart'，Nop]）;
    }
    if（this.wheelZoom）{
      handlers [cid] .push（[['mousewheel'，MouseWheel]）;
      handlers [cid] .push（[['DOMMouseScroll'，MouseWheel]）;
    }
    if（this.scrollPause）{
      handlers [cid] .push（[['scroll'，Scroll，window]）;
    }
    for（i = 0; i <handlers [cid] .length; ++ i）{
      p = handlers [cid] [i];
      AddHandler（p [0]，p [1]，p [2]？p [2]：c）;
    }
  }
  if（！TagCanvas.started）{
    raf = window.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    TagCanvas.NextFrame = raf？TagCanvas.NextFrameRAF：
      TagCanvas.NextFrameTimeout;
    TagCanvas.interval = this.interval;
    TagCanvas.NextFrame（this.interval）;
    TagCanvas.started = 1;
  }
}
TCproto = TagCanvas.prototype;
TCproto.SourceElements = function（）{
  如果（doc.querySelectorAll）
    返回doc.querySelectorAll（'＃'+ this.source）;
  返回[doc.getElementById（this.source）];
};
TCproto.HideTags = function（）{
  var el = this.SourceElements（），i;
  for（i = 0; i <el.length; ++ i）
    el [i] .style.display ='none';
};
TCproto.GetTags = function（）{
  var el = this.SourceElements（），etl，tl = []，i，j，k;
  for（k = 0; k <= this.repeatTags; ++ k）{
    for（i = 0; i <el.length; ++ i）{
      etl = el [i] .getElementsByTagName（'a'）;
      for（j = 0; j <etl.length; ++ j）{
        tl.push（etl [j]）;
      }
    }
  }
  返回tl;
};
TCproto.Message = function（text）{
  var tl = []，i，p，tc = text.split（''），a，t，x，z;
  for（i = 0; i <tc.length; ++ i）{
    if（tc [i]！=''）{
      p = i-tc.length / 2;
      一个= doc.createElement（'A'）;
      a.href ='＃';
      a.innerText = tc [i];
      x = 100 * sin（p / 9）;
      z = -100 * cos（p / 9）;
      t = new Tag（this，tc [i]，a，[x，0，z]，2，18，'＃000'，'#fff'，0，0，0，
        'monospace'，2，tc [i]）;
      t.Init（）;
      tl.push（t）;
    }
  }
  返回tl;
};
TCproto.CreateTag = function（e）{
  var im，i，t，txt，ts，font，bc，boc，p = [0，0，0];
  if（'text'！= this.imageMode）{
    im = e.getElementsByTagName（'img'）;
    if（im.length）{
      i =新图片；
      i.src = im [0] .src;

      if（！this.imageMode）{
        t = new Tag（this，“”，e，p，0，0）;
        t.SetImage（i）;
        //t.Init（）;
        AddImage（i，im [0]，t，this）;
        返回t
      }
    }
  }
  if（'image'！= this.imageMode）{
    ts = new TextSplitter（e）;
    txt = ts.Lines（）;
    if（！ts.Empty（））{
      字体= this.textFont || FixFont（GetProperty（e，'font-family'））;
      如果（this.splitWidth）
        txt = ts.SplitWidth（this.splitWidth，this.ctxt，font，this.textHeight）;

      bc = this.bgColour =='标签'吗？GetProperty（e，'background-color'）：
        this.bgColour;
      boc = this.bgOutline =='标签'吗？GetProperty（e，'color'）：this.bgOutline;
    }其他{
      ts = null;
    }
  }
  if（ts || i）{
    t = new Tag（this，txt，e，p，2，this.textHeight + 2，
      this.textColour || GetProperty（e，'color'），bc，this.bgRadius，
      boc，this.bgOutlineThickness，字体，this.padding，ts && ts.original）；
    如果我） {
      t.SetImage（i）;
      AddImage（i，im [0]，t，this）;
    }其他{
      t.Init（）;
    }
    返回t
  }
};
TCproto.UpdateTag = function（t，a）{
  var color = this.textColour || GetProperty（a，'color'），
    字体= this.textFont || FixFont（GetProperty（a，'font-family'）），
    bc = this.bgColour =='标签'吗？GetProperty（a，'background-color'）：
      this.bgColour，boc = this.bgOutline =='tag'吗？GetProperty（a，'颜色'）：
      this.bgOutline;
  ta = a;
  t.title = a.title;
  if（t.colour！=颜色|| t.textFont！=字体|| t.bgColour！= bc ||
    t.bgOutline！= boc）
    t.SetFont（font，colour，bc，boc）;
};
TCproto.Weight = function（tl）{
  var ll = tl.length，w，i，s，weights = []，有效，
    wfrom = this.weightFrom？this.weightFrom.split（/ [，] /）：[null]，
    wl = wfrom.length;
  for（i = 0; i <ll; ++ i）{
    权重[i] = [];
    for（s = 0; s <wl; ++ s）{
      w = FindWeight（tl [i] .a，wfrom [s]，this.textHeight）;
      if（！this.max_weight [s] || w> this.max_weight [s]）
        this.max_weight [s] = w;
      if（！this.min_weight [s] || w <this.min_weight [s]）
        this.min_weight [s] = w;
      权重[i] [s] = w;
    }
  }
  for（s = 0; s <wl; ++ s）{
    if（this.max_weight [s]> this.min_weight [s]）
      有效= 1;
  }
  如果（有效）{
    for（i = 0; i <ll; ++ i）{
      tl [i] .SetWeight（weights [i]）;
    }
  }
};
TCproto.Load = function（）{
  var tl = this.GetTags（），标记列表= []，形状，t，
    shapeArgs，rx，ry，rz，vl，i，tagmap = []，pfuncs = {
      领域：PointsOnSphere，
      vcylinder：PointsOnCylinderV，
      hcylinder：PointsOnCylinderH，
      版本：PointsOnRingV，
      鸣响：PointsOnRingH
    };

  if（tl.length）{
    tagmap.length = tl.length;
    for（i = 0; i <tl.length; ++ i）
      tagmap [i] = i;
    this.shuffleTags && Shuffle（tagmap）;
    rx = 100 * this.radiusX;
    ry = 100 * this.radiusY;
    rz = 100 * this.radiusZ;
    this.max_radius = max（rx，max（ry，rz））;

    for（i = 0; i <tl.length; ++ i）{
      t = this.CreateTag（tl [tagmap [i]]）;
      如果（t）
        taglist.push（t）;
    }
    this.weight && this.Weight（taglist，true）;
  
    if（this.shapeArgs）{
      this.shapeArgs [0] = taglist.length;
    }其他{
      shapeArgs = this.shape.toString（）。split（/ [（），] /）;
      shape = shapeArgs.shift（）;
      if（typeof window [shape] ==='function'）
        this.shape = window [shape];
      其他
        this.shape = pfuncs [shape] || pfuncs.sphere;
      this.shapeArgs = [taglist.length，rx，ry，rz] .concat（shapeArgs）;
    }
    vl = this.shape.apply（this，this.shapeArgs）;
    this.listLength = taglist.length;
    for（i = 0; i <taglist.length; ++ i）
      taglist [i] .position = new Vector（vl [i] [0]，vl [i] [1]，vl [i] [2]）;
  }
  if（this.noTagsMessage &&！taglist.length）{
    i =（this.imageMode && this.imageMode！='both'？this.imageMode +''：''）;
    标签列表= this.Message（'No'+ i +'tags'）;
  }
  this.taglist =标签列表;
};
TCproto.Update = function（）{
  var tl = this.GetTags（），newlist = []，
    taglist = this.taglist，找到了，
    添加= []，删除= []，vl，ol，nl，i，j；

  if（！this.shapeArgs）
    返回this.Load（）;

  if（tl.length）{
    nl = this.listLength = tl.length;
    ol = taglist.length;

    //复制现有列表，填充“已删除”
    for（i = 0; i <ol; ++ i）{
      newlist.push（taglist [i]）;
      remove.push（i）;
    }

    //查找添加和删除的标签
    for（i = 0; i <nl; ++ i）{
      for（j = 0，found = 0; j <ol; ++ j）{
        if（taglist [j] .EqualTo（tl [i]））{
          this.UpdateTag（newlist [j]，tl [i]）;
          找到=删除[j] = -1;
        }
      }
      如果（！找到）
        add.push（i）;
    }

    //清除已删除列表中找到的标签
    for（i = 0，j = 0; i <ol; ++ i）{
      if（removed [j] == -1）
        remove.splice（j，1）;
      其他
        ++ j;
    }

    //在删除旧标签的间隙中插入新标签
    if（removed.length）{
      随机播放（已删除）；
      while（removed.length && add.length）{
        我= remove.shift（）;
        j = add.shift（）;
        newlist [i] = this.CreateTag（tl [j]）;
      }

      //移除更多（以相反的顺序）
      remove.sort（function（a，b）{return ab}）;
      while（removed.length）{
        newlist.splice（removed.pop（），1）;
      }
    }

    //添加任何额外的标签
    j = newlist.length /（add.length + 1）;
    i = 0;
    while（add.length）{
      newlist.splice（ceil（++ i * j），0，this.CreateTag（tl [added.shift（）]））;
    }

    //为标签分配正确的位置
    this.shapeArgs [0] = nl = newlist.length;
    vl = this.shape.apply（this，this.shapeArgs）;
    for（i = 0; i <nl; ++ i）
      newlist [i] .position = new Vector（vl [i] [0]，vl [i] [1]，vl [i] [2]）;

    //重新标记
    this.weight && this.Weight（newlist）;
  }
  this.taglist = newlist;
};
TCproto.SetShadow = function（c）{
  c.shadowBlur = this.shadowBlur;
  c.shadowOffsetX = this.shadowOffset [0];
  c.shadowOffsetY = this.shadowOffset [1];
};
TCproto.Draw = function（t）{
  如果（this.paused）
    返回;
  var cv = this.canvas，cw = cv.width，ch = cv.height，max_sc = 0，
    tdelta =（t-this.time）* TagCanvas.interval / 1000，
    x = cw / 2 + this.offsetX，y = ch / 2 + this.offsetY，c = this.ctxt，
    活动的，a，i，aindex = -1，tl = this.taglist，l = tl.length，
    frontsel = this.frontSelect，centerDrawn =（this.centreFunc == Nop），已修复;
  this.time = t;
  如果（this.frozen && this.drawn）
    返回this.Animate（cw，ch，tdelta）;
  固定= this.AnimateFixed（）;
  c.setTransform（1,0,0,1,0,0）;
  for（i = 0; i <l; ++ i）
    tl [i] .Calc（this.transform，this.fixedAlpha）;
  tl = SortList（tl，function（a，b）{return bz-az}）;
  
  if（fixed && this.fixedAnim.active）{
    活动= this.fixedAnim.tag.UpdateActive（c，x，y）;
  }其他{
    this.active = null;
    for（i = 0; i <l; ++ i）{
      a = this.mx> = 0 && this.my> = 0 && this.taglist [i] .CheckActive（c，x，y）;
      if（a && a.sc> max_sc &&（！frontsel || az <= 0））{
        活动= a;
        aindex = i;
        active.tag = this.taglist [i];
        max_sc = a.sc;
      }
    }
    this.active =活动；
  }

  this.txtOpt || （this.shadow && this.SetShadow（c））;
  c.clearRect（0,0，cw，ch）;
  for（i = 0; i <l; ++ i）{
    if（！centreDrawn && tl [i] .z <= 0）{
      //如果下一个标签在最前面，则运行centerFunc
      尝试{this.centreFunc（c，cw，ch，x，y）; }
      抓住{e} {
        警报（e）;
        //不要再运行
        this.centreFunc = Nop;
      }
      centreDrawn = true;
    }

    if（！（active && active.tag == tl [i] && active.PreDraw（c，tl [i]，x，y）））
      tl [i] .Draw（c，x，y）;
    active && active.tag == tl [i] && active.PostDraw（c）;
  }
  if（this.freezeActive && active）{
    this.Freeze（）;
  }其他{
    this.UnFreeze（）;
    this.drawn =（l == this.listLength）;
  }
  if（this.fixedCallback）{
    this.fixedCallback（this，this.fixedCallbackTag）;
    this.fixedCallback = null;
  }
  固定|| this.Animate（cw，ch，tdelta）;
  active && active.LastDraw（c）;
  cv.style.cursor =活动？this.activeCursor：'';
  this.Tooltip（active，this.taglist [aindex]）;
};
TCproto.TooltipNone = function（）{};
TCproto.TooltipNative = function（active，tag）{
  如果（活跃）
    this.canvas.title =标签&& tag.title？tag.title：'';
  其他
    this.canvas.title = this.ctitle;
};
TCproto.SetTTDiv = function（title，tag）{
  var tc = this，s = tc.ttdiv.style;
  if（title！= tc.ttdiv.innerHTML）
    s.display ='none';
  tc.ttdiv.innerHTML =标题；
  标签&&（tag.title = tc.ttdiv.innerHTML）;
  if（s.display =='none'&&！tc.tttimer）{
    tc.tttimer = setTimeout（function（）{
      var p = AbsPos（tc.canvas.id）;
      s.display ='block';
      s.left = px + tc.mx +'px';
      s.top = py + tc.my + 24 +'px';
      tc.tttimer = null;
    }，tc.tooltipDelay）;
  }
};
TCproto.TooltipDiv = function（active，tag）{
  if（active && tag && tag.title）{
    this.SetTTDiv（tag.title，tag）;
  } else if（！active && this.mx！= -1 && this.my！= -1 && this.ctitle.length）{
    this.SetTTDiv（this.ctitle）;
  }其他{
    this.ttdiv.style.display ='none';
  }
};
TCproto.Transform = function（tc，p，y）{
  if（p || y）{
    var sp = sin（p），cp = cos（p），sy = sin（y），cy = cos（y），
      ym = new Matrix（[cy，0，sy，0,1,0，-sy，0，cy]），
      pm = new Matrix（[1,0,0，0，cp，-sp，0，sp，cp]）;
    tc.transform = tc.transform.mul（ym.mul（pm））;
  }
};
TCproto.AnimateFixed = function（）{
  var fa，t1，angle，m，d;
  if（this.fadeIn）{
    t1 = TimeNow（）-this.startTime;
    if（t1> = this.fadeIn）{
      this.fadeIn = 0;
      this.fixedAlpha = 1;
    }其他{
      this.fixedAlpha = t1 / this.fadeIn;
    }
  }
  if（this.fixedAnim）{
    if（！this.fixedAnim.transform）
      this.fixedAnim.transform = this.transform;
    fa = this.fixedAnim，t1 = TimeNow（）-fa.t0，angle = fa.angle，
      m，d = this.animTiming（fa.t，t1）;
    this.transform = fa.transform;
    if（t1> = fa.t）{
      this.fixedCallbackTag = fa.tag;
      this.fixedCallback = fa.cb;
      this.fixedAnim = this.yaw = this.pitch = 0;
    }其他{
      角* = d;
    }
    m = Matrix.Rotation（angle，fa.axis）;
    this.transform = this.transform.mul（m）;
    返回（this.fixedAnim！= 0）;
  }
  返回false；
};
TCproto.AnimatePosition = function（w，h，t）{
  var tc = this，x = tc.mx，y = tc.my，s，r;
  if（！tc.frozen && x> = 0 && y> = 0 && x <w && y <h）{
    s = tc.maxSpeed，r = tc.reverse？-1：1;
    tc.lx || （tc.yaw =（（x * 2 * s / w）-s）* r * t）;
    tc.ly || （tc.pitch =（（y * 2 * s / h）-s）* -r * t）;
    tc.initial = null;
  } else if（！tc.initial）{
    if（tc.frozen &&！tc.freezeDecel）
      tc.yaw = tc.pitch = 0;
    其他
      tc.Decel（tc）;
  }
  this.Transform（tc，tc.pitch，tc.yaw）;
};
TCproto.AnimateDrag = function（w，h，t）{
  var tc = this，rs = 100 * t * tc.maxSpeed / tc.max_radius / tc.zoom;
  if（tc.dx || tc.dy）{
    tc.lx || （tc.yaw = tc.dx * rs / tc.stretchX）;
    tc.ly || （tc.pitch = tc.dy * -rs / tc.stretchY）;
    tc.dx = tc.dy = 0;
    tc.initial = null;
  } else if（！tc.initial）{
    tc.Decel（tc）;
  }
  this.Transform（tc，tc.pitch，tc.yaw）;
};
TCproto.Freeze = function（）{
  if（！this.frozen）{
    this.preFreeze = [this.yaw，this.pitch];
    this.frozen = 1;
    this.drawn = 0;
  }
};
TCproto.UnFreeze = function（）{
  if（this.frozen）{
    this.yaw = this.preFreeze [0];
    this.pitch = this.preFreeze [1];
    this.frozen = 0;
  }
};
TCproto.Decel = function（tc）{
  var s = tc.minSpeed，ay = abs（tc.yaw），ap = abs（tc.pitch）；
  if（！tc.lx && ay> s）
    tc.yaw = ay> tc.z0吗？tc.yaw * tc.decel：0;
  if（！tc.ly && ap> s）
    tc.pitch = ap> tc.z0？tc.pitch * tc.decel：0;
};
TCproto.Zoom = function（r）{
  this.z2 = this.z1 *（1 / r）;
  this.drawn = 0;
};
TCproto.Clicked = function（e）{
  var a = this.active;
  尝试{
    if（a && a.tag）
      if（this.clickToFront ===假|| this.clickToFront === null）
        a.tag.Clicked（e）;
      其他
        this.TagToFront（a.tag，this.clickToFront，function（）{
          a.tag.Clicked（e）;
        }，是对的）；
  } catch（ex）{
  }
};
TCproto.Wheel = function（i）{
  var z = this.zoom + this.zoomStep *（i？1：-1）;
  this.zoom = min（this.zoomMax，max（this.zoomMin，z））;
  this.Zoom（this.zoom）;
};
TCproto.BeginDrag = function（e）{
  this.down = EventXY（e，this.canvas）;
  e.cancelBubble = true;
  e.returnValue = false;
  e.preventDefault && e.preventDefault（）;
};
TCproto.Drag = function（e，p）{
  if（this.dragControl && this.down）{
    var t2 = this.dragThreshold * this.dragThreshold，
      dx = px-this.down.x，dy = py-this.down.y;
    if（this.dragging || dx * dx + dy * dy> t2）{
      this.dx = dx;
      this.dy = dy;
      this.dragging = 1;
      this.down = p;
    }
  }
  返回this.dragging;
};
TCproto.EndDrag = function（）{
  var res = this.dragging;
  this.dragging = this.down = null;
  返回资源；
};
函数PinchDistance（e）{
  var t1 = e.targetTouches [0]，t2 = e.targetTouches [1];
  返回sqrt（pow（t2.pageX-t1.pageX，2）+ pow（t2.pageY-t1.pageY，2））;
}
TCproto.BeginPinch = function（e）{
  this.pinched = [PinchDistance（e），this.zoom];
  e.preventDefault && e.preventDefault（）;
};
TCproto.Pinch = function（e）{
  var z，d，p = this.pinched;
  如果（！p）
    返回;
  d = PinchDistance（e）;
  z = p [1] * d / p [0];
  this.zoom = min（this.zoomMax，max（this.zoomMin，z））;
  this.Zoom（this.zoom）;
};
TCproto.EndPinch = function（e）{
  this.pinched = null;
};
TCproto.Pause = function（）{this.paused = true; };
TCproto.Resume = function（）{this.paused = false; };
TCproto.SetSpeed = function（i）{
  this.initial = i;
  this.yaw = i [0] * this.maxSpeed;
  this.pitch = i [1] * this.maxSpeed;
};
TCproto.FindTag = function（t）{
  如果（！定义（t））
    返回null;
  Defined（t.index）&&（t = t.index）;
  if（！IsObject（t））
    返回this.taglist [t];
  var srch，tgt，i;
  如果（定义（t.id））
    srch ='id'，tgt = t.id;
  否则if（定义（t.text））
    srch ='innerText'，tgt = t.text;

  for（i = 0; i <this.taglist.length; ++ i）
    if（this.taglist [i] .a [srch] == tgt）
      返回this.taglist [i];
};
TCproto.RotateTag = function（tag，lt，lg，time，callback，active）{
  var t = tag.Calc（this.transform，1），v1 = new Vector（tx，ty，tz），
    v2 = MakeVector（lg，lt），angle = v1.angle（v2），u = v1.cross（v2）.unit（）;
  if（angle == 0）{
    this.fixedCallbackTag =标签；
    this.fixedCallback =回调;
  }其他{
    this.fixedAnim = {
      角度：-角度，
      轴：u，
      t：时间，
      t0：TimeNow（），
      cb：回调，
      标签：标签，
      活动：活动
    };
  }
};
TCproto.TagToFront = function（tag，time，callback，active）{
  this.RotateTag（tag，0，0，time，callback，active）;
};
TagCanvas.Start = function（id，l，o）{
  TagCanvas.Delete（id）;
  TagCanvas.tc [id] =新的TagCanvas（id，l，o）;
};
函数tccall（f，id）{
  TagCanvas.tc [id] && TagCanvas.tc [id] [f]（）;
}
TagCanvas.Linear = function（t，t0）{return t0 / t; }
TagCanvas.Smooth = function（t，t0）{return 0.5-cos（t0 * Math.PI / t）/ 2; }
TagCanvas.Pause = function（id）{tccall（'Pause'，id）; };
TagCanvas.Resume = function（id）{tccall（'Resume'，id）; };
TagCanvas.Reload = function（id）{tccall（'Load'，id）; };
TagCanvas.Update = function（id）{tccall（'Update'，id）; };
TagCanvas.SetSpeed = function（id，speed）{
  if（IsObject（speed）&& TagCanvas.tc [id] &&
    ！isNaN（速度[0]）&&！isNaN（速度[1]））{
    TagCanvas.tc [id] .SetSpeed（speed）;
    返回true；
  }
  返回false；
};
TagCanvas.TagToFront = function（id，options）{
  if（！IsObject（options））
    返回false；
  options.lat = options.lng = 0;
  返回TagCanvas.RotateTag（id，options）;
};
TagCanvas.RotateTag = function（id，options）{
  if（IsObject（options）&& TagCanvas.tc [id]）{
    if（isNaN（options.time））
      options.time = 500;
    var tt = TagCanvas.tc [id] .FindTag（options）;
    if（tt）{
      TagCanvas.tc [id] .RotateTag（tt，options.lat，options.lng，
        options.time，options.callback，options.active）;
      返回true；
    }
  }
  返回false；
};
TagCanvas.Delete = function（id）{
  var i，c;
  if（handlers [id]）{
    c = doc.getElementById（id）;
    如果（c）{
      for（i = 0; i <handlers [id] .length; ++ i）
        RemoveHandler（handlers [id] [i] [0]，handlers [id] [i] [1]，c）;
    }
  }
  删除处理程序[id];
  删除TagCanvas.tc [id];
};
TagCanvas.NextFrameRAF = function（）{
  requestAnimationFrame（DrawCanvasRAF）;
};
TagCanvas.NextFrameTimeout = function（iv）{
  setTimeout（DrawCanvas，iv）;
};
TagCanvas.tc = {};
TagCanvas.options = {
z1：20000，
z2：20000，
z0：0.0002，
FrozenActive：否，
FrozenDecel：否，
activeCursor：“指针”，
脉动至：1
pulsateTime：3，
反向：错误，
深度：0.5，
最高速度：0.05，
minSpeed：0，
减速度：0.95，
间隔：20
minBrightness：0.1，
maxBrightness：1
outlineColour：'＃ffff99'，
outlineThickness：2
outlineOffset：5，
outlineMethod：'轮廓'，
outlineRadius：0，
textColour：'＃ff99ff'，
textHeight：15
textFont：'Helvetica，Arial，sans-serif'，
阴影：“＃000”，
shadowBlur：0，
shadowOffset：[0,0]，
首字母：null，
hideTags：是的，
变焦：1
重量：假，
weightMode：“大小”，
weightFrom：null，
重量尺寸：1，
weightSizeMin：null，
weightSizeMax：null，
weightGradient：{0：'＃f00'，0.33：'＃ff0'，0.66：'＃0f0'，1：'＃00f'}，
txtOpt：是的，
txtScale：2
frontSelect：否，
wheelZoom：正确，
zoomMin：0.3，
zoomMax：3，
zoomStep：0.05，
形状：“球形”，
锁：空，
工具提示：null，
工具提示延迟：300，
tooltipClass：'tctooltip'，
radiusX：1
radiusY：1
radiusZ：1
StretchX：1
StretchY：1
offsetX：0，
offsetY：0，
shuffleTags：错误，
noSelect：否，
noMouse：否，
imageScale：1
暂停：错误，
dragControl：false，
dragThreshold：4，
centreFunc：Nop，
splitWidth：0
动画时间：“平滑”，
clickToFront：否，
fadeIn：0，
填充：0
bgColour：null，
bgRadius：0，
bgOutline：null，
bgOutlineThickness：0，
outline增加：4
textAlign：'中心'，
textVAlign：'中间'，
imageMode：null，
imagePosition：null，
imagePadding：2
imageAlign：'中心'，
imageVAlign：'中间'，
noTagsMessage：是的，
centreImage：null，
pinchZoom：否，
repeatTags：0，
minTags：0，
imageRadius：0，
scrollPause：否，
outlineDash：0，
outlineDashSpace：0，
outlineDashSpeed：1
};
for（i在TagCanvas.options中）TagCanvas [i] = TagCanvas.options [i];
window.TagCanvas = TagCanvas;
//为窗口加载时间设置一个标志
AddHandler（'load'，function（）{TagCanvas.loaded = 1}，窗口）;
}）（）;