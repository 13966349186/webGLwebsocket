/**
 * @author wangbin17910@gmail.com
 * �����������ļ�
 */

 //����
exports.Expires = {
    fileMatch: /^(gif|png|jpg|js|css)$/ig,
    maxAge: 60 * 60 * 24 * 365
};
//��Ҫgzipѹ�����ļ�
exports.Compress = {
    match: /css|js|html/ig
};
//���ó�ʼ��ҳ��
exports.Welcome = {
    file: "index.html"
};