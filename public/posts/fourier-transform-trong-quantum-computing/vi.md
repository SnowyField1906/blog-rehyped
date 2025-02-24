---
title: Xây dựng Fourier Transform cho máy tính lượng tử
date: '2024-10-03'
tags: ['Quantum Computing', 'Computer Science', 'Complex Numbers']
description: Giới thiệu về Fourier Transform và ý nghĩa của nó trong cơ học lượng tử và điện toán lượng tử. Tìm hiểu về 3 thuật toán Deutsch-Jozsa, Bernstein–Vazirani và Quantum Fourier Transform.
---

*Fourier Transform luôn là phép toán đẹp nhất và ấn tượng nhất đối với mình. Điều đầu tiên sau khi mình đọc vài [chương sách](https://s3.amazonaws.com/arena-attachments/1000401/c8d3f8742d163b7ffd6ae3e4e4e07bf3.pdf) về quantum computing là nghĩ ngay đến độ sexy của em toán này khi áp dụng trên máy tính lượng tử, và đó cũng là động lực để mình để viết bài viết này. Ứng dụng máy tính lượng tử trong việc thực hiện Fourier Transform sẽ khá thú vị và đẹp mắt, đây là một case study hoàn hảo cho quantum computing.*

*Bài viết này sẽ warm-up với thuật toán Deutsch-Jozsa, nhằm hiểu một số khái niệm cơ bản về quantum computing, Hadamard, Oracle và Phase Kickback. Sau đó mở rộng với thuật toán Bernstein–Vazirani, một bài toán tương tự nhưng phức tạp hơn. Tiếp đến là sơ lược về Fourier Transform và đôi điều về ý nghĩa của nó trong vật lý. Cuối cùng là Quantum Fourier Transform, một trong những thuật toán quan trọng nhất trong quantum computing, kèm theo một số khái niệm cần thiết.*

> Các lý thuyết cơ bản về quantum computing sẽ bị bỏ qua trong bài viết này, bù lại phần toán học sẽ được giải thích và chứng minh một cách chi tiết và chặt chẽ.

## Thuật toán Deutsch-Jozsa

### Giới thiệu về Deutsch-Jozsa

> Đây là thuật toán được phát triển từ thuật toán *Deutsch (1985)* trong việc xác định xem một hàm là hàm *hằng* hay *cân bằng* với input là $1$ bit duy nhất, và được giải quyết bằng $1$ truy vấn trên máy tính lượng tử, thay vì $2$ truy vấn như máy tính truyền thống. Thuật toán *Deutsch-Jozsa* mở rộng vấn đề này cho $n$ input nhưng vẫn chỉ cần $1$ truy vấn.

Cho hàm $f: \{0, 1\}^n \mapsto \{0, 1\}$, nhận đầu vào là một chuỗi bit có độ dài $n$ và trả về $1$ bit. Số tham số có thể nhận được là số cặp của *tích descartes* $|\{0, 1\}^n| = 2^n$. Mục tiêu của thuật toán *Deutsch-Jozsa* là xác định xem hàm $f$ là *hàm hằng (constant function)* hay *hàm cân bằng (balanced function)*.

Định nghĩa rằng một *hàm hằng* là một hàm mà giá trị trả về luôn giống nhau cho mọi input.

$$
\begin{align}
f_{con}: \{0, 1\}^n \mapsto \{0, 1\} = c &  , &  c \in \{0, 1\}
\end{align}
$$

Trong đó, một *hàm cân bằng* là một hàm mà giá trị trả về khác nhau cho một nửa input và giống nhau cho nửa còn lại.

$$
\begin{align}
f_{bal}: \{0, 1\}^n \mapsto \{0, 1\} &  , &  |f^-1(0)| = |f^-1 (1)| = 2^{n-1}
\end{align}
$$

> Hàm cân bằng là một trong những "tiêu chí quan trọng nhất đối với các hàm Boolean trong cryptography". Nếu một hàm Boolean không cân bằng, nó sẽ có độ lệch (trong thống kê), khiến mã dễ bị phân tích và tấn công (cụ thể là correlation attack).[^1]

Để kiểm tra một hàm là hàm *hằng* hay *cân bằng*, phương pháp cổ điển có độ phức tạp $O(2^n)$, cụ thể là phải truy vấn $2^{n-1} + 1$ lần trong trường hợp xấu nhất, đây là trường hợp mà toàn bộ một nửa đầu vào $2^{n-1}$ trả về cùng một giá trị và phải xác định bằng cách kiểm tra thêm $1$ lần nữa.

Trong khi đó, máy tính lượng tử chỉ cần $1$ lần truy vấn duy nhất bằng thuật toán *Deutsch-Jozsa*, nhờ vào **Oracle** và **Phase Kickback**, hai tiền đề quan trọng cho việc xây dựng *Quantum Fourier Transform*.

### Ý tưởng của Deutsch-Jozsa

<Figure name="deutsch-jozsa-gate.png" caption="Thuật toán Deutsch-Jozsa dưới dạng cổng (source: Qiskit.org)" />

Để có thể xác định hàm $f$ chỉ bằng một truy vấn duy nhất, thuật toán thay vì kiểm tra từng đầu vào một cách tuần tự như trong phương pháp cổ điển, *Deutsch-Jozsa* tận dụng tính chất đặc biệt của hiện tượng *chồng chập lượng tử* (quantum superposition) để kiểm tra tất cả các đầu vào cùng một lúc bằng cách sử dụng cổng **Hadamard**.

Toàn bộ trạng thái chồng chập của hệ thống sẽ được đưa vào một **Oracle** (hay còn gọi là **Black-box**) để thực thi hàm $f$. Quá trình này sẽ điều chỉnh các *pha* của *qubit*, hiện tượng này gọi là **Phase Kickback**. \
Đây là một kĩ thuật cực kì quan trọng, **Phrase Kickback** sẽ tác động lên *qubit* đang ở *trạng thái chồng chập* dựa trên **Oracle** cho trước. Ở đây, nếu $f$ là *hàm cân bằng*, **Oracle** sẽ đảo ngược *pha* của một nửa các *qubit*.

Sau cùng, nếu $f$ là *hàm hằng*, tất cả các trạng thái sẽ cùng *pha*, khi giao thoa sẽ *cộng hưởng* và khiến cho *biên độ (xác suất đo được)* đạt đến $100\%$. \
Ngược lại, nếu $f$ là *hàm cân bằng*, một nửa các trạng thái sẽ ngược *pha*, khi giao thoa sẽ *triệt tiêu* và khiến cho *biên độ (xác suất đo được)* trở thành $0\%$.

> Cổng **Hadamard** và **Oracle** sẽ được làm rõ về mặt toán học ở phần dưới.

### Xây dựng thuật toán Deutsch-Jozsa

Cho $n$ *qubit* có trạng thái ban đầu $\ket{0}$ và $1$ *qubit* $\ket{-}$ dùng làm *ancilla*. Trạng thái ban đầu của hệ thống là:

$$
\begin{align}
\ket{\psi_0} = \ket{0}^{\otimes n} \otimes \ket{-}
\end{align}
$$

Cần lưu ý rằng $\otimes$ là *tích tensor (tensor product)*, trong *quantum computing* nó đại diện cho việc kết hợp các *qubit* thành một hệ thống lớn hơn. Việc *tích tensor* sẽ không làm cho các *qubit* bị *vướng víu (entangled)*, chúng chỉ **có khả năng** bị vướng víu khi chúng ta áp dụng các *cổng kiểm soát (controlled gate)*.

Từ giờ chúng ta sẽ rút gọn *tích tensor* $\ket{x} \otimes \ket{y}$ thành $\ket{x}\ket{y}$, và *tích vô hướng* $\bra{x} \cdot \ket{y}$ thành $\braket{xy}$.

#### Giai đoạn 1: Áp dụng cổng Hadamard lần 1

Cổng **Hadamard** có tác dụng có tác dụng chuyển đổi một *qubit* từ *trạng thái cơ bản* sang *trạng thái chồng chập* bằng cách thực hiện một phép quay $\pi$ quanh $(\hat{x} + \hat{z})/\sqrt{2}$.

$$
\begin{align}
\textbf{H} = \begin{bmatrix}
\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\
\frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{2}}
\end{bmatrix}
\end{align}
$$

Ví dụ:

$$
\begin{align}
\textbf{H}\ket{0} = \frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1} = \ket{+} \\
\textbf{H}\ket{1} = \frac{1}{\sqrt{2}}\ket{0} - \frac{1}{\sqrt{2}}\ket{1} = \ket{-}
\end{align}
$$

Trước tiên ta xem xét:

$$
\begin{align}
\textbf{H}^{\otimes n}\ket{0}^{\otimes n} &= \left(\textbf{H}\ket{0}\right)^{\otimes n} \notag \\
&= \left(\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}\right)^{\otimes n} \tag*{\text{xem lại (5)}} \\
&= \frac{1}{\sqrt{2^n}}\bigg(\ket{0} + \ket{1}\bigg)^{\otimes n} \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}\ket{x}
\end{align}
$$

> Ở dấu bằng cuối cùng, người đọc có thể tự chứng minh bằng quy nạp.

Do đó, trạng thái ở giai đoạn này là:

$$
\begin{align}
\ket{\psi_1} &= \textbf{H}^{\otimes n}\ket{\psi_0} \notag \\
&= \textbf{H}^{\otimes n}\ket{0}^{\otimes n} \ket{-} \notag \\
&= \left(\frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}\ket{x} \right) \ket{-} \tag*{\text{xem lại (7)}} \\
&= \frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}\ket{x} \ket{-}
\end{align}
$$

#### Giai đoạn 2: Sử dụng Oracle

**Oracle**, hay còn gọi là **Black-box** (Hộp đen), được kí hiệu là $\textbf{O}_f$, là một cổng giúp hàm $f$ có thể *khả nghịch (invertible)* trong không gian trạng thái. Có hai lí do không thể sử dụng trực tiếp hàm $f$ mà phải thông qua **Oracle**:

1. Vì hàm $f: \{0, 1\}^n \mapsto \{0, 1\}^m$ và đôi khi $n \neq m$ (như trong bài toán này đầu vào là $n$ và đầu ra là $1$). Một ma trận $n \times m$ chắc chắn không *khả nghịch*, nếu một cổng lượng tử có số lượng input và output khác nhau sẽ vi phạm nguyên lý bảo toàn hạt lượng tử vì các hạt không thể bị mất đi hay nhân bản. Cụ thể hơn, các cổng lượng tử phải là *unitary matrix*, gồm các điều kiện sau: *square (vuông)*, *complex (phức)* và *orthonormal (trực chuẩn)*.
2. Ngay cả khi $n = m$, ma trận vẫn có thể không *khả nghịch*. Nếu tồn tại $x \neq y$ sao cho $f(x) = f(y)$, khi đó $\textbf{O}\ket{x} = \textbf{O}\ket{y}$ trong khi $\textbf{O}^\dagger\textbf{O}\ket{x} \neq \textbf{O}^\dagger\textbf{O}\ket{y}$. Điều này có nghĩa là không thể áp dụng phép *chuyển vị liên hợp (conjugate transpose)* lên $\textbf{O}$, hay nói cách khác, $\textbf{O}^\dagger = \textbf{O}^{-1}$ không tồn tại.

Điều này có thể giải quyết bằng cách bổ sung vào một lượng $m$ các *ancilla qubit* (hay còn gọi là *register*) để giữ kết quả của hàm $f$.

$$
\begin{align}
\textbf{O}_f\ket{x}\ket{y} = \ket{x}\ket{y \oplus f(x)} && \forall x \in \{0, 1\}^n , y \in \{0, 1\}^m
\end{align}
$$

Trong bài toán này, vì số lượng output là $1$, ta có thể sử dụng $1$ *qubit* có trạng thái $\ket{-}$ làm *ancilla*.

$$
\begin{align}
\textbf{O}_f\ket{x}\ket{-} &= \textbf{O}_f\frac{1}{\sqrt{2}}\bigg(\ket{x}\ket{0} - \ket{x}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\textbf{O}_f\ket{x}\ket{0} - \textbf{O}_f\ket{x}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{x}\ket{f(x)} - \ket{x}\overline{f(x)}\bigg) \notag \\
&= \begin{cases}
\frac{1}{\sqrt{2}}\big(\ket{x}\ket{0} - \ket{x}\ket{1}\big) & \text{nếu } f(x) = 0 \\
\frac{1}{\sqrt{2}}\big(\ket{x}\ket{1} - \ket{x}\ket{0}\big) & \text{nếu } f(x) = 1
\end{cases} \notag \\
&= (-1)^{f(x)}\frac{1}{\sqrt{2}}\bigg(\ket{x}\ket{0} - \ket{x}\ket{1}\bigg) \notag \\
&= (-1)^{f(x)}\ket{x}\ket{-}
\end{align}
$$

Do đó, với đầu vào là 2 *qubit* $\ket{x}$ và $\ket{-}$, cổng $\textbf{O}_f$ sẽ cho ra 2 *qubit* $(-1)^{f(x)}\ket{x}$ và $\ket{-}$. Chúng ta có thể bỏ *qubit* $\ket{-}$ đi vì không còn cần thiết.

Quay trở lại bài toán, sau khi áp dụng **Oracle**, trạng thái ở giai đoạn này là:

$$
\begin{align}
\ket{\psi_2} &= \textbf{O}_f\ket{\psi_1} \notag \\
&= \textbf{O}_f\frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}\ket{x} \ket{-} \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}\textbf{O}_f\ket{x} \ket{-} \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)}\ket{x} \ket{-} \tag*{\text{xem lại (10)}} \\
&= \frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)}\ket{x}
\end{align}
$$

#### Giai đoạn 3: Áp dụng cổng Hadamard lần 2

Đan xen cổng **Hadamard** là một kĩ thuật rất phổ biến trong *quantum computing*, sau khi chuyển đổi *trạng thái cơ bản* sang *trạng thái chồng chập* và tận dụng tính chất của nó để thực hiện các phép tính một cách song song, có thể áp dụng cổng một lần nữa để hoàn nguyên về *trạng thái cơ bản*, tránh hiện tượng *chồng chập* khi đo.

Trước tiên ta xem xét:

$$
\begin{align}
\textbf{H}^{\otimes n}\ket{x} &= \bigotimes_{i=1}^{n}\textbf{H}\ket{x_i} \notag \\
&= \bigotimes_{i=1}^{n}\frac{1}{\sqrt{2}}\bigg(\ket{0} + (-1)^{x_i}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{y \in \{0, 1\}^n}(-1)^{x \cdot y}\ket{y}
\end{align}
$$

> Ở dấu bằng cuối cùng, người đọc có thể tự chứng minh bằng quy nạp.

Trạng thái ở giai đoạn này là:

$$
\begin{align}
\ket{\psi_3} &= \textbf{H}^{\otimes n}\ket{\psi_2} \notag \\
&= \textbf{H}^{\otimes n}\frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)}\ket{x} \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)}\textbf{H}^{\otimes n}\ket{x} \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)}\bigg(\frac{1}{\sqrt{2^n}}\sum_{y \in \{0, 1\}^n}(-1)^{x \cdot y}\ket{y} \bigg) \tag*{\text{xem lại (12)}} \\
&= \frac{1}{2^n}\sum_{y \in \{0, 1\}^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x) + x \cdot y}\ket{y} \\
\end{align}
$$

#### Giai đoạn 4: Đo trạng thái

Trước tiên chúng ta phân tích xác suất của trạng thái $\ket{0}^{\otimes n}$. Giả sử $\ket{y} = \ket{0}^{\otimes n}$.

$$
\begin{align}
\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x) + x \cdot y} &= \frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x) + x \cdot 0} \notag \\
&= \frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)} \\
\end{align}
$$

Ở đây sẽ có 2 trường hợp.

1. Nếu $f$ là hàm *cân bằng*, các giá trị của $(-1)^{f(x)}$ sẽ bằng $\pm 1$ một cách đan xen và triệt tiêu nhau, dẫn đến tổng bằng $0$.

$$
\begin{align}
\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)} = 0
\end{align}
$$

2. Nếu $f$ là hàm *hằng*, các giá trị của $(-1)^{f(x)}$ sẽ chỉ bằng $+1$ hoặc $-1$, và tổng đến $|\{0, 1\}^n| = 2^n$ lần sẽ bằng $\pm 2^n$, triệt tiêu với hệ số phía trước.

$$
\begin{align}
\begin{cases}
\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)} = 1 & \text{nếu } f(x) = 0 & \forall x \\
\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)} = -1 & \text{nếu } f(x) = 1 & \forall x
\end{cases}
\end{align}
$$

Do đó:

$$
\begin{align}
\text{Pr}\big(\text{measure } \ket{0}^{\otimes n}\big) &= \bigg|\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)}\bigg|^2 \notag \\
&= \begin{cases}
1 & \text{nếu } f_{con} \\
0 & \text{nếu } f_{bal}
\end{cases}
\end{align}
$$

Vì vậy, ta chỉ cần đo trạng thái $\ket{\psi_3}$ để xác định hàm $f$ là hàm *hằng* hay hàm *cân bằng*. Nếu đo được $\ket{0}^{\otimes n}$ thì hàm $f$ là hàm *hằng*, còn nếu đo được bất kì giá trị nào khác, hàm $f$ là hàm *cân bằng*.

### Mở rộng: Thuật toán Bernstein–Vazirani

Thuật toán *Bernstein–Vazirani (1992)* giải quyết vấn đề tương tự như thuật toán *Deutsch-Jozsa*, nhưng mở rộng hơn, cho hàm $f: \{0, 1\}^n \mapsto \{0, 1\}$. Để giải quyết độ phức tạp của *hidden shift* nổi tiếng, có ứng dụng quan trọng trong *cryptography* và *error correction*.

Trong bài toán *hidden shift*, một hàm $f$ được xác định bởi phép *XOR* 2 chuỗi bit $x$ và $s$ với $n$ độ dài. Mục tiêu là xác định chuỗi $s$ trong hàm $f$ như sau:

$$
\begin{align}
f(x) &= x \oplus s \notag \\
&= \sum_{i=0}^{n-1}s_i \oplus x_i \notag \\
&= \sum_{i=0}^{n-1}s_i \cdot x_i &(\bmod{\text{ 2}})
\end{align}
$$

Tất nhiên, với máy tính thông thường, thuật toán tối ưu nhất là $O(n)$, thử từng input $x = 2^i$ vào hàm $f$.

$$
\begin{align}
f(00\ldots01) &= s_{n-1}\cdot 0 + s_{n-2}\cdot 0 + \ldots +  s_1\cdot 0 + s_0\cdot 1 = s_0 &(\bmod{\text{ 2}})\notag \\
f(00\ldots10) &= s_{n-1}\cdot 0 + s_{n-2}\cdot 0 + \ldots + s_1\cdot 1 + s_0\cdot 0 = s_1 &(\bmod{\text{ 2}})\notag \\
&\vdots \notag \\
f(10\ldots00) &= s_{n-1}\cdot 1 + s_{n-2}\cdot 0 + \ldots + s_1\cdot 0 + s_0\cdot 0 = s_{n-1} &(\bmod{\text{ 2}})
\end{align}
$$

Hay tổng quát hơn:

$$
\begin{align}
s &= \sum_{i=0}^{n-1}f(2^i) \cdot 2^i \notag \\
&= s_0 \cdot 2^0 + s_1 \cdot 2^1 + \ldots + s_{n-1} \cdot 2^{n-1}
\end{align}
$$

Tuy nhiên, với máy tính lượng tử, chỉ cần $1$ truy vấn bằng thuật toán *Bernstein–Vazirani*.

<Figure name="deutsch-jozsa-gate.png" caption="Thuật toán Bernstein–Vazirani dưới dạng cổng, hoàn toàn tương tự với Deutsch-Jozsa (source: Qiskit.org)" />

Thuật toán *Bernstein–Vazirani* hoàn toàn tương tự thuật toán *Deutsch-Jozsa*, chỉ khác ở [giai đoạn 3](#giai-đoạn-3-áp-dụng-cổng-hadamard-lần-2), sau khi áp dụng **Oracle**, hàm $f$ sẽ được biến đổi theo cách khác.

$$
\begin{align}
\ket{\psi_3} &= \frac{1}{2^n}\sum_{y \in \{0, 1\}^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x) + x \cdot y}\ket{y} \notag  \\
&= \frac{1}{2^n}\sum_{y \in \{0, 1\}^n}\sum_{x \in \{0, 1\}^n}(-1)^{x \cdot s + x \cdot y}\ket{y} \notag  \\
&= \frac{1}{2^n}\sum_{y \in \{0, 1\}^n}\sum_{x \in \{0, 1\}^n}(-1)^{x (s \oplus y)}\ket{y}
\end{align}
$$

Lúc này, chúng ta sẽ phân tích xác suất của trạng thái $\ket{s}$. Giả sử $\ket{y} = \ket{s}$.

$$
\begin{align}
\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{x (s \oplus y)} &= \frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{x (s \oplus s)} \notag \\
&= \frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{x \cdot 0}
\end{align}
$$

Vì phép *XOR* khi áp dụng lên chính nó sẽ bằng $0$, các giá trị của $(-1)^{x \cdot 0}$ sẽ bằng 1, và tổng đến $|\{0, 1\}^n| = 2^n$ lần sẽ bằng $2^n$, triệt tiêu với hệ số phía trước.

$$
\begin{align}
\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{x (s \oplus s)} &= 1
\end{align}
$$

Do đó:

$$
\begin{align}
\text{Pr}\big(\text{measure } \ket{s}\big) &= \bigg|\frac{1}{2^n}\sum_{x \in \{0, 1\}^n}(-1)^{f(x)}\bigg|^2 \notag \\
&= 1
\end{align}
$$

Vì vậy, ta chỉ cần đo trạng thái của $\ket{\psi_3}$ và đó chính là chuỗi $s$ cần tìm.

## Sơ lược về Fourier Transform

### Fourier Transform

**Fourier Transform** là một trong những phép toán quan trọng nhất trong toán học, giúp chuyển đổi một tín hiệu từ miền thời gian $t$ sang miền tần số $\omega$ và có vai trò quan trọng trong hầu hết các lĩnh vực khoa học. Các thuật toán *quantum computing* cũng sử dụng **Quantum Fourier Transform** rất nhiều, đơn cử như thuật toán *Shor* nổi tiếng đã áp dụng **Quantum Fourier Transform** để tìm ra chu kỳ của hàm tuần hoàn $f(x) = a^x \mod N$ trong thời gian đa thức.

Việc hình dung được **Fourier Transform** có thể giúp giải thích được rất nhiều hiện tượng lượng tử nói riêng và các mối quan hệ nói chung.

Các lý thuyết về *không-thời gian (space-time)*, như **Special Relativity** (Thuyết tương đối Hẹp) của *Albert Einstein* có nhiều mối liên hệ mật thiết đối với phép **Fourier Transform**. Lí do là vì chúng ta đang quan sát một không gian phụ thuộc vào thời gian, rất nhiều tính chất và đặc trưng đã bị loại bỏ, **Fourier Transform** có thể tìm thấy và lí giải được nhiều hiện tượng nhờ vào việc chuyển đổi sang một miền tương đối hơn  [^2].

Tuy nhiên chúng ta sẽ tập trung về mặt *cơ học lượng tử*, ở đây có một mối quan hệ tương tự là *vị trí-động lượng (position-momentum)* được nêu trong **Uncertainty Principle** (Nguyên lý Bất định) của *Heisenberg*. **Uncertainty Principle** ngụ ý rằng khi áp dụng **Fourier Transform** lên hàm vị trí $\psi(x)$, ta thu được hàm động lượng $\psi(p)$, điều này có thể được xem như sự phân bố của $\psi(x)$ và $\psi(p)$ có mối quan hệ nghịch đảo (đây là tính chất cơ bản của **Fourier Transform**).

Mối quan hệ nghịch đảo trong **Fourier Transform** có thể được hiểu rằng một nốt (âm thanh) sắc nét ở một tần số duy nhất sẽ kéo theo một hàm tuần hoàn $\sin$ vô hạn và không xác định. Ngược lại, nếu âm thanh quá ngắn, tần số sẽ không thể được xác định chính xác và kéo theo phổ trải rộng vô hạn. Vì vậy để xác định chính xác (các) tần số của một âm thanh, âm thanh đó phải đủ dài để (các) phổ có "thời gian" hội tụ về (các) tần số riêng biệt và rõ ràng.

Tương tự với **Uncertainty Principle**, mối quan hệ nghịch đảo này cho thấy nếu một hạt có *vị trí* càng chính xác thì *động lượng* của hạt sẽ không chắc chắn và ngược lại.

- Nếu hàm *vị trí* $\psi(x)$ thu hẹp (tập trung quanh một điểm), thì hạt có *vị trí* rất xác định (hàm hẹp trong miền không gian). Nhưng chuyển đổi qua **Fourier Transform**, hàm *động lượng* $\psi(p)$ sẽ trở nên trải rộng. Tức là *động lượng* của hạt sẽ rất bất định (độ rộng lớn trong miền *động lượng*). Điều này tuân theo **Uncertainty Principle**: Biết *vị trí* càng chính xác, *động lượng* càng không chính xác.
- Ngược lại, nếu hàm *vị trí* $\psi(x)$ trải rộng (không có sự hội tụ rõ ràng), thì hạt có *vị trí* rất bất định (hàm rộng trong miền không gian). Nhưng khi chuyển đổi qua **Fourier Transform**, hàm *động lượng* $\psi(p)$ sẽ trở nên tập trung. Tức là *động lượng* của hạt sẽ rất xác định (độ rộng nhỏ trong miền *động lượng*). Điều này cũng tuân theo **Uncertainty Principle**: Biết *động lượng* càng chính xác, *vị trí* càng bất định.

Ngoài *không-thời gian* và *vị trí-động lượng*. **Fourier Transform** $f(x) \leftrightarrow \hat{f}(\xi)$ còn có thể áp dụng cho rất nhiều mối quan hệ khác miễn chúng là các *đại lượng liên hợp (conjugate variables)*. Thậm chí còn có thể xác định hình dạng và cấu trúc của hạt nhân nguyên tử bằng mối quan hệ giữa *phân bổ không gian - phân bổ động lượng (spatial distribution - momentum distribution)* [^3] [^4].

$$
\begin{align}
f: \mathbb{R} \mapsto \mathbb{C} \xrightarrow{\text{FF}} \hat{f}: \mathbb{R} \mapsto \mathbb{C}
\end{align}
$$

Nói một cách khác **Fourier Transform** giúp chúng ta phân tích một sóng đã được giao thoa thành các thành phần cơ bản (tần số). Ngược lại *Inverse Fourier Transform (IFF)* giúp chúng ta tổ hợp các thành phần cơ bản để tạo ra một sóng giao thoa.

**Fourier Transform** và **Inverse Fourier Transform** trên miền liên tục được định nghĩa như sau:

$$
\begin{align}
\hat{f}(\omega) = \int_{-\infty}^{\infty}f(t)e^{-2\pi i \omega t}dt \\
f(t) = \int_{-\infty}^{\infty}\hat{f}(\omega)e^{2\pi i \omega t}d\omega
\end{align}
$$

### Discrete Fourier Transform

Trong khi đó, **Discrete Fourier Transform (DFT)** $\textbf{x} \mapsto \hat{\textbf{x}}$ là phiên bản rời rạc của **Fourier Transform**. Được áp dụng nhiều hơn trong thực tế để bỏ qua độ phức tạp lớn của **Fourier Transform**.

$$
\begin{align}
\textbf{x}: \mathbb{C}^N \xrightarrow{\text{DFT}} \hat{\textbf{x}}: \mathbb{C}^N
\end{align}
$$

**Discrete Fourier Transform** và **Inverse Discrete Fourier Transform** trên chuỗi số hữu hạn $x_0, x_1, \ldots, x_{N-1}$ được định nghĩa như sau:

$$
\begin{align}
\hat{\textbf{x}}_k = \sum_{n=0}^{N-1}\textbf{x}_ne^{-2\pi i \big(\frac{kn}{N}\big)} \\
\textbf{x}_n = \frac{1}{N}\sum_{k=0}^{N-1}\hat{\textbf{x}}_ke^{2\pi i \big(\frac{kn}{N}\big)}
\end{align}
$$

Qua đó, ta có thể nhận thấy rằng $\hat{\textbf{x}}$ và $\textbf{x}$ là các biến đổi tuyến tính của nhau (phép nhân ma trận) thông qua ma trận $\textbf{F}_N$ sao cho:

$$
\begin{align}
\hat{\textbf{x}} = \textbf{F}_N\textbf{x} \\
\textbf{x} = \textbf{F}_N^{-1}\hat{\textbf{x}}
\end{align}
$$

$\textbf{F}_N$ là một *unitary matrix* với các phần tử được xác định qua $\omega = e^{-2\pi i/N}$ như sau:

$$
\begin{align}
\textbf{F}_N = \frac{1}{\sqrt{N}}\begin{bmatrix}
1 & 1 & 1 & \ldots & 1 \\
1 & \omega & \omega^2 & \ldots & \omega^{N-1} \\
1 & \omega^2 & \omega^4 & \ldots & \omega^{2(N-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & \omega^{N-1} & \omega^{2(N-1)} & \ldots & \omega^{(N-1)(N-1)}
\end{bmatrix}
\end{align}
$$

> Người đọc có thể tự chứng minh $\textbf{F}_N$ là *unitary matrix* bằng cách kiểm tra $\textbf{F}_N^\dagger\textbf{F}_N = \textbf{F}_N\textbf{F}_N^\dagger = \textbf{I}$.

Do đó, một thuật toán **Discrete Fourier Transform** thông thường có độ phức tạp $O(N^2)$.

### Fast Fourier Transform

**Fast Fourier Transform (FFT)** có độ phức tạp $O(N\log N)$, vượt trội hơn theo hàm mũ so với **Discrete Fourier Transform** $O(N^2)$. **Discrete Fourier Transform** có $N$ phần tử và mỗi phần tử có $N$ pha, *Fast Fourier Transform* tận dụng tính chất *primitive root* của $\omega$ để làm giảm số lần thao tác với pha từ $N$ xuống còn $\log N$ cho mỗi phần tử.

> Chi tiết về Fast Fourier Transform có thể được xem lại qua bài viết [Ứng dụng Fast Fourier Transform trong phép nhân số nguyên lớn](/posts/ung-dung-fast-fourier-transform-trong-phep-nhan-so-nguyen-lon).

## Quantum Fourier Transform

### Giới thiệu về QFT

**Quantum Fourier Transform (QFT)** có độ phức tạp là $O(\log^2 N)$, vượt trội hơn theo hàm mũ đối với **Fast Fourier Transform** $O(N\log N)$. Trên máy tính truyền thống, một chuỗi *nhị phân* độ dài $N = 2^n$ sẽ được biểu diễn bằng $2^n$ bit $0$ và $1$. Máy tính lượng tử có thể biểu diễn chuỗi *nhị phân* này chỉ bằng $n$ *qubit*. Đó là lí do tại sao thực tế **Quantum Fourier Transform** vẫn có độ phức tạp là $O(n^2)$ tuy nhiên $n = \log N$.

Để hiểu tại sao máy tính lượng tử chỉ cần $n$ *qubit* cho $2^n$ phần tử, chúng ta có thể nhớ lại rằng để mô phỏng được $n$ *qubit* chúng ta sẽ cần tới $2^n$ *bit* vì đây là số lượng trạng thái có thể có. Vì mỗi trạng thái sẽ có một *pha* (và *biên độ*) tương ứng nên chúng ta sẽ lưu trữ được $2^n$ *pha*.

> Một so sánh thú vị là một *số nguyên không dấu (unsigned integer)* $256$ *bit* có thể biểu diễn được một con số (xấp xỉ) **số luợng** nguyên tử trong vũ trụ ($2^{256} - 1$) và máy tính lượng tử chỉ cần $8$ *qubit* để làm điều đó ($2^8 = 256$). Và tất nhiên nếu chúng ta có thể biến mỗi một nguyên tử thành một *bit*, thì toàn bộ vũ trụ cũng chỉ mô phỏng được $256$ *qubit*.

### Ý tưởng của QFT

<Figure name="quantum-fourier-transform.png" caption="Thuật toán Quantum Fourier Transform dưới dạng cổng (source: Hamza Jaffali @ Medium.com)" />

*Pha* là một thành phần tối quan trọng trong *quantum computing*. Một trạng thái *qubit* ngoài việc có thể *chồng chập* giữa $\ket{0}$ và $\ket{1}$ còn có thể xoay quanh $\hat{z}$ mà vẫn giữ *trạng thái chồng chập* với *biên độ* không đổi. Điều khó nhất đối với một thuật toán lượng tử là truy vết được kết quả mong muốn sau khi thực hiện các phép tính song song.

Ở bài toán *Deutsch-Jozsa* hay *Bernstein–Vazirani*, **Phase Kickback** thông qua $(-1)^{f(x)}$ đã cho ra hai *pha* ngược nhau là $0$ và $\pi$. **Quantum Fourier Transform** không chỉ sử dụng hai *pha* như trên mà là tất cả *pha* có thể có, tương ứng với độ dài của chuỗi *bit*.

Hãy quay lại công thức **Discrete Fourier Transform**:

$$
\begin{align}
\hat{\textbf{x}}_k = \sum_{n=0}^{N-1}\textbf{x}_ne^{-2\pi i \big(\frac{kn}{N}\big)}
\end{align}
$$

Chúng ta có thể thấy rằng $\hat{\textbf{x}}_k$ là *tích vô hướng* giữa $\textbf{x}$ và $\textbf{w}_k$ thể hiện độ mạnh của thành phần (tần số) trong chuỗi. Việc tích luỹ (tích vô hướng) các *pha* này sẽ được thực hiện qua cổng **Controlled Phase Shift**. Cụm từ "Controlled" ở mang ý nghĩa rằng sẽ có nhiều hơn $2$ *qubit* tương tác với nhau (gồm các *controller* và một *target*).

### Xây dựng công thức QFT

Vì **Quantum Fourier Transform** được xây dựng dựa trên **Discrete Fourier Transform**, chúng ta có thể xây dựng lại toàn bộ công thức từ đây bằng một chút biến đổi.

Cho **Quantum Fourier Transform** $\ket{k} \mapsto \ket{j}$, trước tiên ta xem xét biểu diễn *nhị phân* chuỗi *bit* của $j$ và $k$:

$$
\begin{align}
j &= j_{n-1}j_{n-2}\ldots j_1 \notag \\
&= j_{n-1} \cdot 2^{n-1} + j_{n-2} \cdot 2^{n-2} + \ldots + j_0 \cdot 2^0 \notag \\
&= \sum_{l=0}^{n-1}j_l \cdot 2^{l}\\
k &= k_{n-1}k_{n-2}\ldots k_1 \notag \\
&= k_{n-1} \cdot 2^{n-1} + k_{n-2} \cdot 2^{n-2} + \ldots + k_0 \cdot 2^0 \notag \\
&= \sum_{l=0}^{n-1}k_l \cdot 2^{l}
\end{align}
$$

Mở rộng thêm chút nữa, khi chia cho $2^l$ (hoặc trong lập trình gọi là *shift* sang phải $l$ *bit*), ta sẽ được một phần *nguyên* và một phần *thập phân* (của số *nhị phân*):

$$
\begin{align}
\frac{j}{2^{l}} &= (j_{n-1} j_{n-2} \ldots j_0) \cdot 2^{-l} \notag \\
&= (j_{n-1} j_{n-2} \ldots j_{l} \cdot 2^l + j_{l-1}j_{l-2} \ldots j_0)\cdot 2^{-l} \notag \\
&= J + ( j_{l-1}j_{l-2} \ldots j_0)\cdot 2^{-l} \notag \\
&= J +  j_{l-1} \cdot 2^{-1} + j_{l-2} \cdot 2^{-2} + \ldots + j_0 \cdot 2^{-l} \notag \\
&= J + 0.j_{l-1}j_{l-2}\ldots j_0
\end{align}
$$

Ta có thể bỏ qua phần *nguyên* $J$ khi luỹ thừa cùng với $e^{2\pi i}$ bằng công thức *Euler*:

$$
\begin{align}
e^{2\pi i\big(\frac{j}{2^l}\big)} &= e^{2\pi i J + 2\pi i 0.j_{l-1}j_{l-2}\ldots j_0} \tag*{\text{xem lại (37)}} \\
&= e^{2\pi i J} \cdot e^{2\pi i 0.j_{l-1}j_{l-2}\ldots j_0} \notag \\
&= \big(cos(2\pi) + i\sin(2\pi)\big)^J \cdot e^{2\pi i 0.j_{l-1}j_{l-2}\ldots j_0} \notag \\
&= \big(1 + i0\big)^J \cdot e^{2\pi i 0.j_{l-1}j_{l-2}\ldots j_0} \notag \\
&= 1^J \cdot e^{2\pi i 0.j_{l-1}j_{l-2}\ldots j_0} \notag \\
&= e^{2\pi i 0.j_{l-1}j_{l-2}\ldots j_0}
\end{align}
$$

Từ đây ta đã có đủ cơ sở để thực hiện biến đổi công thức **Discrete Fourier Transform**:

$$
\begin{align}
\ket{j} &= \frac{1}{\sqrt{2^n}}\sum_{k=0}^{2^n-1}e^{2\pi i \big(\frac{k}{2^n}\big)}\ket{k} \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{k_{0}=0}^{1}\sum_{k_{1}=0}^{1}\ldots\sum_{k_{n-1}=0}^{1}e^{2\pi i j\big(\frac{k_{n-1}k_{n-2}\ldots k_0}{2^n}\big)}\ket{k_{n-1}k_{n-2}\ldots k_0} \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{k_1=0}^{1}\sum_{k_2=0}^{1}\ldots\sum_{k_n=0}^{1}e^{2\pi i j\big(\frac{\sum_{l=0}^{n-1}k_l \cdot 2^l}{2^n}\big)}\ket{k_{n-1}k_{n-2}\ldots k_0} \tag*{\text{xem lại (36)}} \\
&= \frac{1}{\sqrt{2^n}}\sum_{k_1=0}^{1}\sum_{k_2=0}^{1}\ldots\sum_{k_n=0}^{1}e^{2\pi i j\sum_{l=0}^{n-1}\big(\frac{k_l}{2^{n-l}}\big)}\bigg(\ket{k_{n-1}}\otimes\ket{k_{n-2}}\otimes\ldots \otimes\ket{k_0} \bigg) \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{k_1=0}^{1}\sum_{k_2=0}^{1}\ldots\sum_{k_n=0}^{1}\bigg(e^{2\pi i j\big(\frac{k_{n-1}}{2^1}\big)}\ket{k_{n-1}}\otimes e^{2\pi i j\big(\frac{k_{n-2}}{2^2}\big)}\ket{k_{n-2}} \otimes\cdots\otimes e^{2\pi i j\big(\frac{k_0}{2^n}\big)}\ket{k_0}\bigg) \notag \\
&= \frac{1}{\sqrt{2^n}}\sum_{k_1=0}^{1}\sum_{k_2=0}^{1}\ldots\sum_{k_n=0}^{1}\bigg(\bigotimes_{l=n-1}^{0}e^{2\pi ij\big(\frac{k_l}{2^{n-l}}\big)}\ket{k_l}\bigg) \notag \\
&= \frac{1}{\sqrt{2^n}}\bigotimes_{l=n-1}^{0}\bigg(\sum_{k_l=0}^{1}e^{2\pi i j\big(\frac{k_l}{2^{n-l}}\big)}\ket{k_l} \bigg) \notag \\
&= \frac{1}{\sqrt{2^n}}\bigotimes_{l=n-1}^{0}\bigg(\ket{0} + e^{2\pi i \big(\frac{j}{2^{n-l}}\big)}\ket{1} \bigg) \notag \\
&= \frac{1}{\sqrt{2^n}}\bigg(\ket{0} + e^{2\pi i \big(\frac{j}{2^1}\big)}\ket{1}\bigg)\otimes\bigg(\ket{0} + e^{2\pi i \big(\frac{j}{2^2}\big)}\ket{1}\bigg)\otimes\ldots\otimes\bigg(\ket{0} + e^{2\pi i \big(\frac{j}{2^{n}}\big)}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2^n}}\bigg(\ket{0} + e^{2\pi i(0.j_{0})}\ket{1}\bigg)\bigg(\ket{0} + e^{2\pi i(0.j_1j_0)}\ket{1}\bigg)\ldots\bigg(\ket{0} + e^{2\pi i(0.j_{n-1}j_{n-2}\cdots j_0)}\ket{1}\bigg) \tag*{\text{xem lại (38)}} \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i(0.j_{0})}\ket{1}\bigg)\frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i(0.j_1j_0)}\ket{1}\bigg)\ldots\frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i(0.j_{n-1}j_{n-2}\cdots j_0)}\ket{1}\bigg)  \\
\end{align}
$$

Nhắc lại:

$$
\begin{align}
0.j_{l-1}j_{l-2}\cdots j_0 = \frac{j_{l-1}}{2} + \frac{j_{l-2}}{2^2} + \cdots + \frac{j_0}{2^{l}}
\end{align}
$$

Vậy trạng thái của *qubit* $l$ sẽ là:

$$
\begin{align}
\ket{j_{l}} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i(0.j_{n-l-1} j_{n-l-2} \ldots j_0)}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_{n-l-1}}{2} + \frac{j_{n-l-2}}{4} + \ldots + \frac{j_0}{2^{n-l}}\big)}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_{n-l-1}}{2}\big)} e^{2\pi i\big(\frac{j_{n-l-2}}{4}\big)} \ldots e^{2\pi i\big(\frac{j_0}{2^{n-l}}\big)}\ket{1}\bigg)  \\
\end{align}
$$

Phần chứng minh khá dài và khó theo dõi nhưng sẽ rất hữu ích để có một trực giác tốt về **Quantum Fourier Transform** (và những phần như này sẽ không tìm được trên bất kì tài liệu nào khác). Cho những ai lười đọc đống kí tự trên, chúng ta có thể xem qua ví dụ sau:

$$
\begin{align}
\ket{j_{n-1}} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_0}{2}\big)} \ket{1}\bigg)  \\
\ket{j_{n-2}} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_1}{2}\big)} e^{2\pi i\big(\frac{j_0}{4}\big)} \ket{1}\bigg)  \\
\ket{j_{n-3}} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_2}{2}\big)} e^{2\pi i\big(\frac{j_1}{4}\big)} e^{2\pi i\big(\frac{j_0}{8}\big)} \ket{1}\bigg)  \\
&\cdots \notag \\
\ket{j_1} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_{n-2}}{2}\big)} e^{2\pi i\big(\frac{j_{n-3}}{4}\big)} \ldots e^{2\pi i\big(\frac{j_0}{2^{n-2}}\big)}\ket{1}\bigg)  \\
\ket{j_0} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_{n-1}}{2}\big)} e^{2\pi i\big(\frac{j_{n-2}}{4}\big)} \ldots e^{2\pi i\big(\frac{j_0}{2^{n-1}}\big)}\ket{1}\bigg)  \\
\end{align}
$$

Từ đây chúng ta có thể hình dung được rằng, **Quantum Fourier Transform** gồm $n-1$ *qubit* $\ket{+}$, mỗi *qubit* có *pha* là $2\pi i\big(\frac{j_k}{2^l}\big)$ tương ứng với *bit* $j_k$ của *nhị phân* $j$.

### Xây dựng thuật toán QFT

#### Giai đoạn 1: Áp dụng cổng Hadamard

Trước tiên, chúng ta nhận thấy trạng thái $\ket{j_l}$ rất giống với trạng thái của *qubit* sau khi áp dụng cổng **Hadamard**.

$$
\begin{align}
\textbf{H}\ket{0} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + \ket{1}\bigg) \\
\textbf{H}\ket{1} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} - \ket{1}\bigg)
\end{align}
$$

Tuy nhiên ta không thể biết trạng thái $\ket{j_l}$ là $\ket{0}$ hay $\ket{1}$ nên ta có thể biểu diễn dưới dạng **Phase Kickback**.

$$
\begin{align}
\textbf{H}\ket{j_l} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + (-1)^{j_l}\ket{1}\bigg) \\
\end{align}
$$

Do đó, trạng thái của $\ket{j_l}$ ở giai đoạn 1 sẽ là:

$$
\begin{align}
\ket{\psi_1^{(l)}} &= \textbf{H}\ket{j_l} \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + (-1)^{j_l}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{\big(\frac{2\pi i}{2}\big)j_l}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i \big(\frac{j_l}{2}\big)}\ket{1}\bigg)
\end{align}
$$

#### Giai đoạn 2: Áp dụng cổng Controlled Phase Shift

Tuy nhiên chúng ta vẫn còn thiếu biên độ $e^{2\pi i \big(\frac{j_k}{2^l}\big)}$, hoá ra $\frac{j_k}{2^l}$ chính là *pha* của trạng thái *qubit* $\ket{j_k}$. Chúng ta cần một cổng nào đó có thể thay đổi *pha* đối với *trạng thái cơ bản* $\ket{1}$, và đây chính là công dụng của cổng **Phase Shift** (Dịch Pha).

$$
\begin{align}
\textbf{R}_k = \begin{bmatrix}
1 & 0 \\
0 & e^{2\pi i\big(\frac{1}{2^k}\big)}
\end{bmatrix}
\end{align}
$$

Ví dụ:

$$
\begin{align}
\textbf{R}_k \ket{0} &= \ket{0} \\
\textbf{R}_k \ket{1} &= e^{2\pi i\big(\frac{1}{2^k}\big)}\ket{1}
\end{align}
$$

Cổng **Phase Shift** sẽ không thay đổi pha nếu trạng thái là $\ket{0}$ và thay đổi một *pha* $\theta = 2\pi i\big(\frac{1}{2^k}\big)$ quanh $\hat{z}$ nếu trạng thái là $\ket{1}$. Những cổng logic như này sẽ được gọi là *cổng có điều kiện (controlled gate)* với một *target* và các *controller*.

Giải thích theo nghĩa hình học, $e^{i\theta} = \cos\theta + i\sin\theta$ là *trị riêng (eigenvalue)* và trạng thái $\ket{1}$ là *vector riêng (eigenvector)* của ma trận $\textbf{R}_k$. Nhắc lại *đại số tuyến tính*, các *vector riêng* là các hướng thể hiện sự biến đổi không gian của ma trận so với không gian ban đầu, các *trị riêng* tương ứng thể hiện mức độ ảnh hưởng của từng *vector riêng* đó. Do đó, một ma trận xoay sẽ có *phương trình đặc trưng (characteristic equation)* vô nghiệm (tức là có nghiệm phức) vì các số phức biểu diễn góc xoay.

Do đó, trạng thái của *qubit* $\ket{j_l}$ sau khi áp dụng cổng **Phase Shift** sẽ là:

$$
\begin{align}
\textbf{R}_k\ket{j_l} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i \big(\frac{j_l}{2^k}\big)}\ket{1}\bigg)
\end{align}
$$

Tuy nhiên như vậy vẫn chưa đủ, vì ta thấy rằng *qubit* $\ket{j_l}$ phụ thuộc vào *pha* của toàn bộ các *qubit* $j_{l-1}j_{l-2}\ldots j_0$. Hay nói cách khác, *pha* của *qubit* $\ket{j_l}$ *bị điều khiển (controlled)* bởi các *qubit* trước nó. Chúng ta đến với cổng **Controlled Phase Shift** (Dịch Pha Có Điều kiện).

Cổng này sẽ thay đổi *pha* của *qubit* $\ket{j_\text{target}}$ nếu *qubit* $\ket{j_\text{controller}}$ là $\ket{1}$, còn nếu *qubit* $\ket{j_\text{controller}}$ là $\ket{0}$ thì *qubit* $\ket{j_\text{target}}$ sẽ không thay đổi. Cổng **Controlled Phase Shift** $\textbf{UR}_k$ có dạng:

$$
\begin{align}
\textbf{UR}_k = \begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & e^{2\pi i\big(\frac{1}{2^k}\big)}
\end{bmatrix}
\end{align}
$$

Ví dụ:

$$
\begin{align}
\textbf{UR}_k \ket{00} &= \ket{00} \\
\textbf{UR}_k \ket{01} &= \ket{01} \\
\textbf{UR}_k \ket{10} &= \ket{10} \\
\textbf{UR}_k \ket{11} &= e^{2\pi i\big(\frac{1}{2^k}\big)}\ket{11}
\end{align}
$$

Chúng ta có thể biểu diễn dưới dạng **Phase Kickback**:

$$
\begin{align}
\textbf{UR}_k\ket{+}\ket{j_l} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{1}{2^k}\big)j_l}\ket{1}\bigg)\ket{j_l} \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i \big(\frac{j_l}{2^k}\big)}\ket{1}\bigg)\ket{j_l}
\end{align}
$$

Vì $\ket{j_l}$ không đổi, và để gọn hơn, chúng ta sẽ kí hiệu như sau:

$$
\begin{align}
\textbf{R}_{k}^{(j_l)}\ket{+} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i \big(\frac{j_l}{2^k}\big)}\ket{1}\bigg)
\end{align}
$$

Do đó, trạng thái của $\ket{j_l}$ ở giai đoạn 2 sẽ là:

$$
\begin{align}
\ket{\psi_2^{(l)}} &= \textbf{R}_{2}^{(j_{l-1})}\textbf{R}_{3}^{(j_{l-2})}\ldots\textbf{R}_{l+1}^{(j_0)}\ket{\psi_1^{(l)}} \notag \\
&= \textbf{R}_{2}^{(j_{l-1})}\textbf{R}_{3}^{(j_{l-2})}\ldots\textbf{R}_{l+1}^{(j_0)}\frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i \big(\frac{j_l}{2}\big)}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i \big(\frac{j_{l-1}}{4}\big)}e^{2\pi i \big(\frac{j_{l-2}}{8}\big)}\ldots e^{2\pi i \big(\frac{j_0}{2^{l+1}}\big)}e^{2\pi i \big(\frac{j_l}{2}\big)}\ket{1}\bigg) \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_{l}}{2}\big)} e^{2\pi i\big(\frac{j_{l-1}}{4}\big)} e^{2\pi i \big(\frac{j_{l-2}}{8}\big)}\ldots e^{2\pi i\big(\frac{j_0}{2^{l+1}}\big)}\ket{1}\bigg)
\end{align}
$$

#### Giai đoạn 3: Áp dụng cổng Swap

Chúng ta hãy thử xác định trạng thái $\ket{j_{n-l-1}}$ dựa trên $(41)$:

$$
\begin{align}
\ket{j_{n-l-1}} &= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_{n-(n-l-1)-1}}{2}\big)} e^{2\pi i\big(\frac{j_{n-(n-l-1)-2}}{4}\big)} \ldots e^{2\pi i\big(\frac{j_0}{2^{n-(n-l-1)}}\big)}\ket{1}\bigg)  \notag \\
&= \frac{1}{\sqrt{2}}\bigg(\ket{0} + e^{2\pi i\big(\frac{j_{l}}{2}\big)} e^{2\pi i\big(\frac{j_{l-1}}{4}\big)} e^{2\pi i\big(\frac{j_{l-2}}{8}\big)} \ldots e^{2\pi i\big(\frac{j_0}{2^{l+1}}\big)}\ket{1}\bigg) \\
\end{align}
$$

Hoá ra $\ket{j_{n-l-1}}$ (kết quả sau khi áp dụng *Quantum Fourier Transform*) lại chính là trạng thái $\ket{\psi_2^{(l)}}$ vừa tính được. Điều này rất dễ nhận ra nếu chúng ta nhìn lại công thức **Quantum Fourier Transform** mà chúng ta đã xây dựng ở trên.

- *Pha* của *qubit* đầu tiên $\ket{j_{n-1}}$ phụ thuộc vào $j_{0}$.
- *Pha* của *qubit* thứ hai $\ket{j_{n-2}}$ phụ thuộc vào $j_{0}$ và $j_{1}$.
- ...
- *Pha* của *qubit* cuối cùng $\ket{j_0}$ phụ thuộc vào tất cả các *bit* trước đó.

Vì vậy, chúng ta có thể thấy $j_0$ vừa là *controller* của tất cả các *qubit* vừa là *target* của các *qubit* trước đó. Bằng cách thay đổi thứ tự, ta có được:

- *Pha* của *qubit* đầu tiên $\ket{j_{n-1}}$ phụ thuộc vào tất cả các *bit* sau nó.
- *Pha* của *qubit* thứ hai $\ket{j_{n-2}}$ phụ thuộc vào tất cả các *bit* sau nó.
- ...
- *Pha* của *qubit* cuối cùng $\ket{j_0}$ không phụ thuộc vào bất kì *bit* nào.

Do đó, trạng thái của *qubit* $\ket{j_l}$ ở giai đoạn 3 sẽ là:

$$
\begin{align}
\ket{\psi_3^{(l)}} &= \ket{\psi_2^{(n-l-1)}} \\
\end{align}
$$

[^1]:[Non-linearly Balanced Boolean Functions and Their Propagation Characteristics, Springer](https://link.springer.com/chapter/10.1007/3-540-48329-2_5)
[^2]:[Lorentz Invariance and Special Relativity, University of Florida](https://www.phys.ufl.edu/~thorn/homepage/emlectures2.pdf)
[^3]:[Nuclear Size and Shape, University of Southampton](https://www.personal.soton.ac.uk/ab1u06/teaching/phys3002/course/03_diffraction.pdf)
[^4]:[Atomic Form Factor, Wikipedia](https://en.wikipedia.org/wiki/Atomic_form_factor)
